import React, {FC, ReactNode, useCallback, useEffect, useState} from 'react';
import {hot} from 'react-hot-loader/root';
import {useDispatch, useSelector} from 'react-redux';
import {MemoryRouter as Router} from 'react-router-dom';
import {Flip, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {IpcRendererEvent} from 'electron';

import CreateAccountModal from '@renderer/containers/CreateAccountModal';
import Connect from '@renderer/containers/Connect';
import Layout from '@renderer/containers/Layout';
import {connect, connectAndStoreLocalData, fetchNonDefaultNodeConfigs} from '@renderer/dispatchers/app';
import {useCleanSockets, useCrawlSockets, useReadIpc, useToggle, useWebSockets} from '@renderer/hooks';
import {getActiveBank, getActiveBankConfig} from '@renderer/selectors';
import {displayErrorToast, displayToast} from '@renderer/utils/toast';
import {AppDispatch, LocalStore, ProtocolType, ToastType} from '@shared/types';
import {IpcChannel} from '@shared/ipc';
import {setManagedAccounts, setManagedBanks, setManagedFriends, setManagedValidators} from '@renderer/store/app';
import {setStoreLoadedTrue} from '@renderer/store/config';
import {getStoreLoaded} from '@renderer/selectors/state';

const isDevEnvironment = process.env.NODE_ENV === 'development';

const DEFAULT_BANK = {
  ip_address: '54.183.16.194',
  port: 80,
  protocol: 'http' as ProtocolType,
};

const loadStoreFailToast = (event: any, errorMessage: string) => {
  displayToast(`Could not load Store Data: ${errorMessage}`, ToastType.error);
};

const App: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const activeBank = useSelector(getActiveBank);
  const activeBankConfig = useSelector(getActiveBankConfig);
  const storeLoaded = useSelector(getStoreLoaded);
  const [getStartedModalIsOpen, toggleGetStartedModal] = useToggle(false);
  const [loading, setLoading] = useState<boolean>(true);
  useCrawlSockets();
  useCleanSockets();
  useWebSockets();

  const loadStoreSuccessCallback = useCallback(
    (event: IpcRendererEvent, store: LocalStore) => {
      dispatch(setManagedAccounts(store?.managed_accounts || {}));
      dispatch(setManagedBanks(store?.managed_banks || {}));
      dispatch(setManagedFriends(store?.managed_friends || {}));
      dispatch(setManagedValidators(store?.managed_validators || {}));
      dispatch(setStoreLoadedTrue());
    },
    [dispatch],
  );

  const loadStoreData = useReadIpc({
    channel: IpcChannel.loadStoreData,
    failCallback: loadStoreFailToast,
    successCallback: loadStoreSuccessCallback,
  });

  useEffect(() => {
    loadStoreData();
  }, [loadStoreData, storeLoaded]);

  useEffect(() => {
    if (storeLoaded) {
      dispatch(fetchNonDefaultNodeConfigs());
    }
  }, [dispatch, storeLoaded]);

  useEffect(() => {
    if (!storeLoaded) return;

    if (activeBank && !activeBankConfig) {
      setLoading(true);
      const fetchData = async (): Promise<void> => {
        try {
          await dispatch(connect(activeBank));
        } catch (error) {
          displayToast('An error occurred', ToastType.error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    } else if (!activeBank && !activeBankConfig) {
      setLoading(true);
      const fetchDefaultBankData = async (): Promise<void> => {
        try {
          const response = await dispatch(connectAndStoreLocalData(DEFAULT_BANK, DEFAULT_BANK.ip_address));
          if (response?.error) {
            displayErrorToast(response.error);
            return;
          }
          toggleGetStartedModal(true);
        } catch (error) {
          displayToast('An error occurred', ToastType.error);
        } finally {
          setLoading(false);
        }
      };
      fetchDefaultBankData();
    } else {
      setLoading(false);
    }
  }, [activeBank, activeBankConfig, dispatch, storeLoaded, toggleGetStartedModal]);

  const renderComponent = (): ReactNode => {
    if (!storeLoaded || loading) return null;
    if (!activeBank || !activeBankConfig) return <Connect />;
    return <Layout />;
  };

  return (
    <Router>
      {renderComponent()}
      <ToastContainer
        autoClose={3000}
        closeOnClick
        draggable
        hideProgressBar
        newestOnTop
        pauseOnFocusLoss
        pauseOnHover
        position="top-right"
        rtl={false}
        transition={Flip}
      />
      {getStartedModalIsOpen && <CreateAccountModal close={toggleGetStartedModal} isGetStartedModal />}
    </Router>
  );
};

export default isDevEnvironment ? hot((): JSX.Element => <App />) : App;
