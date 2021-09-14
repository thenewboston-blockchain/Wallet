import React, {ReactNode, useCallback, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ipcRenderer} from 'electron';

import DropdownMenuButton, {
  DropdownMenuDirection,
  DropdownMenuIcon,
  DropdownMenuOption,
} from '@renderer/components/DropdownMenuButton';
import {ArrowLeftIcon, ArrowRightIcon, RefreshIcon} from '@renderer/components/Icons';
import Modal from '@renderer/components/Modal';
import ChangeActiveBankModal from '@renderer/containers/ChangeActiveBankModal';
import Notifications from '@renderer/containers/Notifications';
import {clearLocalState} from '@renderer/dispatchers/app';
import {useToggle, useIpcEffect, useNavigationalHistory, useReadIpc, useWriteIpc} from '@renderer/hooks';
import {getPrimaryValidatorConfig} from '@renderer/selectors';
import localStore from '@renderer/store/local';
import {AppDispatch, LocalStore, SFC} from '@renderer/types';
import {displayToast, ToastType} from '@renderer/utils/toast';
import {getFailChannel, getSuccessChannel, IpcChannel} from '@shared/ipc';

import * as S from './Styles';

const exportSuccessToast = () => {
  displayToast('Store Data has successfully been exported', ToastType.success);
};

const exportFailToast = (event: any, errorMessage: string) => {
  displayToast(`Could not export Store Data: ${errorMessage}`, ToastType.error);
};

const importFailToast = (event: any, errorMessage: string) => {
  displayToast(`Could not import Store Data: ${errorMessage}`, ToastType.error);
};

const restartAppSuccessToast = () => {
  displayToast('Successfully Imported Data', ToastType.success);
};

const restartAppFailToast = (event: any, errorMessage: string) => {
  displayToast(`There was a problem restarting the app: ${errorMessage}`, ToastType.error);
};

const TopNav: SFC = ({className}) => {
  const [changeActiveBankModalIsOpen, toggleActiveBankModal] = useToggle(false);
  const [resetAppModalIsOpen, toggleResetAppModal] = useToggle(false);
  const [importStoreDataModalIsOpen, toggleImportStoreDataModal, setImportStoreDataModalIsOpen] = useToggle(false);
  const dispatch = useDispatch<AppDispatch>();
  useIpcEffect(getSuccessChannel(IpcChannel.restartApp), restartAppSuccessToast);
  useIpcEffect(getFailChannel(IpcChannel.restartApp), restartAppFailToast);
  const {back, backEnabled, forward, forwardEnabled, reload} = useNavigationalHistory();
  const primaryValidatorConfig = useSelector(getPrimaryValidatorConfig);

  const handleImportSuccessCallback = useCallback((event: any, storeData: LocalStore) => {
    localStore.clear();
    localStore.set(storeData);
    ipcRenderer.send(IpcChannel.restartApp);
  }, []);

  const handleExportClick = useWriteIpc({
    channel: IpcChannel.exportStoreData,
    downloadOptions: {buttonLabel: 'Export', defaultPath: 'store-data.json', title: 'Export Store Data'},
    extension: 'json',
    failCallback: exportFailToast,
    payload: JSON.stringify(localStore.store),
    successCallback: exportSuccessToast,
  });

  const handleImportIpc = useReadIpc({
    channel: IpcChannel.importStoreData,
    downloadOptions: {buttonLabel: 'Import', title: 'Import Store Data'},
    failCallback: importFailToast,
    postSendCallback: () => setImportStoreDataModalIsOpen(false),
    successCallback: handleImportSuccessCallback,
  });

  const devDropdownMenuItems = useMemo<DropdownMenuOption[]>(() => {
    return [
      {label: 'Export Store Data', onClick: handleExportClick},
      {label: 'Import Store Data', onClick: toggleImportStoreDataModal},
      {label: 'Reset App', onClick: toggleResetAppModal},
    ];
  }, [handleExportClick, toggleImportStoreDataModal, toggleResetAppModal]);

  const handleResetApp = () => {
    dispatch(clearLocalState());
  };

  const renderLeft = (): ReactNode => (
    <S.SectionWrapper>
      <S.Icon as={ArrowLeftIcon} disabled={!backEnabled} onClick={back} />
      <S.Icon as={ArrowRightIcon} disabled={!forwardEnabled} onClick={forward} />
      <S.Icon as={RefreshIcon} onClick={reload} />
    </S.SectionWrapper>
  );

  const renderRight = (): ReactNode => {
    if (!primaryValidatorConfig) return null;
    return (
      <S.SectionWrapper>
        <S.ChangeBankText onClick={toggleActiveBankModal}>Change Active Bank</S.ChangeBankText>
        <S.Icon
          $dev
          as={DropdownMenuButton}
          direction={DropdownMenuDirection.left}
          icon={DropdownMenuIcon.devTo}
          options={devDropdownMenuItems}
        />
        <Notifications />
      </S.SectionWrapper>
    );
  };

  return (
    <S.Container className={className}>
      {renderLeft()}
      {renderRight()}
      {changeActiveBankModalIsOpen && <ChangeActiveBankModal close={toggleActiveBankModal} />}
      {resetAppModalIsOpen && (
        <Modal close={toggleResetAppModal} header="Reset App (Dev Only)" onSubmit={handleResetApp} submitButton="Reset">
          Are you sure you want to reset the app?
        </Modal>
      )}
      {importStoreDataModalIsOpen && (
        <Modal
          close={toggleImportStoreDataModal}
          header="Import Store Data (Dev Only)"
          onSubmit={handleImportIpc}
          submitButton="Import"
        >
          Are you sure you want to import store data? This action is irreversible.
        </Modal>
      )}
    </S.Container>
  );
};

export default TopNav;
