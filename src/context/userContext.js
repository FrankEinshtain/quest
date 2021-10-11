import React, { useState } from 'react'

export const UserContext = React.createContext()

const UserContextProvider = (props) => {
  const [userId, setUserId] = useState(null)
  const [isLoadingGlobal, setIsLoadingGlobal] = useState(false)
  const [userObject, setUserObject] = useState(null)
  const [token, setToken] = useState(null)
  const [userDataRaw, setUserDataRaw] = useState(null)
  const [events, setEvents] = useState(null)
  const [lang, setLang] = useState('')
  const [showRemoveModal, setShowRemoveModal] = useState(false)
  const [showAfterPublishModal, setShowAfterPublishModal] = useState(false)
  const [showTranslationWarningModal, setShowTranslationWarningModal] = useState(false)
  const [showAliasModal, setShowAliasModal] = useState(false)
  const [showAliasOnlyModal, setShowAliasOnlyModal] = useState(false)
  const [savedEtalonMenu, setSavedEtalonMenu] = useState(null)
  const [tempErrors, setTempErrors] = useState([])
  const [showList, setShowList] = useState([])
  const [qrPopup, setQrPopup] = useState(null)
  const [isMenuUpdating, setIsMenuUpdating] = useState(false)
  const [prevItemProps, setPrevItemProps] = useState({ weight: '100', measure: 'm', price: '99' })
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [startTour, setStartTour] = useState(false)

  return (
    <UserContext.Provider
      value={{
        userId,
        setUserId,
        isLoadingGlobal,
        setIsLoadingGlobal,
        userObject,
        setUserObject,
        token,
        setToken,
        userDataRaw,
        setUserDataRaw,
        events,
        setEvents,
        lang,
        setLang,
        showRemoveModal,
        setShowRemoveModal,
        showAfterPublishModal,
        setShowAfterPublishModal,
        showTranslationWarningModal,
        setShowTranslationWarningModal,
        showAliasModal,
        setShowAliasModal,
        showAliasOnlyModal,
        setShowAliasOnlyModal,
        savedEtalonMenu,
        setSavedEtalonMenu,
        tempErrors,
        setTempErrors,
        showList,
        setShowList,
        qrPopup,
        setQrPopup,
        isMenuUpdating,
        setIsMenuUpdating,
        prevItemProps,
        setPrevItemProps,
        isPreviewOpen,
        setIsPreviewOpen,
        startTour,
        setStartTour,
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
