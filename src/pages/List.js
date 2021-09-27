import React, { useEffect, useState } from "react";
import { useParams, useLocation, useHistory, Link } from "react-router-dom";
import { Container, Tabs, Tab } from "react-bootstrap";
import Items from "../components/Items";
import Search from "../components/Search";
import Share from "../components/Share";
import Config from "../components/Config";
import PrivacyLabel from "../components/PrivacyLabel";
import Notifications from "../components/Notifications";
import "./styles/List.scss";
import { ArrowLeft, Star, StarFill } from "react-bootstrap-icons";
import store from "store";
import ListsRepository from "../services/repositories/ListsRepository";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const List = () => {
  const { listId } = useParams();

  let query = useQuery();
  let history = useHistory();

  const getContextOrDefault = (defaultValue) => {
    return query.get("tab") == null ? defaultValue : query.get("tab");
  };

  const [list, setList] = useState({ privacy: null });
  const [listItems, setListItems] = useState([]);
  const [listIsFaved, setListIsFaved] = useState(false);
  const [showFavIcon, setShowFavIcon] = useState(true);
  const [notifications, setNotifications] = useState(null);
  const [cachedNotifications, setCachedNotifications] = useState(0);
  const [apiErr, setApiErr] = useState(null);

  const [tab, setTab] = useState(getContextOrDefault("items"));

  const [listPermissions, setListPermissions] = useState({});

  const reloadItems = async () => {
    try {
      const items = await ListsRepository.getListItems(listId, true);
      setListItems(items);
    } catch (err) {
      setApiErr(err);
    }
  };

  const shouldBeDisabled = (tabKey) => {
    if (listPermissions.share_type === "admin") {
      return false;
    }
    if (tabKey === "search") {
      if (listPermissions.share_type === "write") {
        return false;
      }
    }

    return true;
  };

  const handleChangeTab = (tab) => {
    if (tab === "items") {
      reloadItems();
    }
    setTab(tab);
  };

  const handleFavClick = async () => {
    setShowFavIcon(false);
    try {
      if (listIsFaved) {
        await ListsRepository.deleteFavorite(listId);
        setListIsFaved(false);
        setShowFavIcon(true);
      } else {
        await ListsRepository.setListAsFavorite(listId);
        setListIsFaved(true);
        setShowFavIcon(true);
      }
    } catch (err) {
      setApiErr(err);
    }
  };

  const getFavouriteIcon = () => {
    return (
      showFavIcon && (
        <button onClick={handleFavClick}>
          {listIsFaved ? <StarFill /> : <Star />}
        </button>
      )
    );
  };

  const getNotificationTabTitle = () => {
    let remaining = 0;
    if (notifications) {
      remaining = notifications.length - cachedNotifications;
    }

    return notifications && notifications.length && remaining !== 0
      ? `Notificaciones (${remaining})`
      : "Notificaciones";
  };

  const getItemsTabTitle = () => {
    return listItems && listItems.length
      ? `Productos (${listItems.length})`
      : "Productos";
  };

  const fetchData = async () => {
    try {
      const listResult = await ListsRepository.getList(listId);
      setList(listResult);

      const items = await ListsRepository.getListItems(listId, true);
      setListItems(items);

      const permissions = await ListsRepository.getListPermissions(listId);
      setListPermissions(permissions);

      const favorites = await ListsRepository.getFavoriteLists();
      favorites.forEach((list) => {
        if (list.id == listId) {
          setListIsFaved(true);
        }
      });

      const listNotifications = await ListsRepository.getListNotifications(
        listId
      );
      setNotifications(listNotifications);
    } catch (err) {
      setApiErr(err);
    }
  };

  useEffect(() => {
    if (store.get(`notifications-${listId}`)) {
      setCachedNotifications(store.get(`notifications-${listId}`));
    }
    fetchData();
  }, [listId]);

  return (
    <Container>
      <div className="list-title">
        <Link to={`/summary`}>
          <ArrowLeft /> Atrás
        </Link>
        {list && (
          <div>
            <h2 className="list-heading">
              {list.title}{" "}
              <span className="fav-icon">{getFavouriteIcon()}</span>
              <PrivacyLabel privacy={list.privacy} />
            </h2>
            <div className="list-description">{list.description}</div>
          </div>
        )}
      </div>
      <Tabs
        activeKey={getContextOrDefault("items")}
        onSelect={(k) => {
          history.push(`/lists/${listId}?tab=${k}`);
          if (k === "items") {
            reloadItems();
          } else if (k === "notifications" && notifications) {
            setCachedNotifications(notifications.length);
            setTimeout(() => {
              store.set(`notifications-${listId}`, notifications.length);
            }, 1000);
          }
          setTab(k);
        }}
      >
        <Tab key="items" eventKey="items" title={getItemsTabTitle()}>
          <Items
            items={listItems}
            listId={listId}
            shareType={listPermissions.share_type}
            itemsError={apiErr}
          />
        </Tab>
        <Tab
          key="notifications"
          eventKey="notifications"
          title={getNotificationTabTitle()}
        >
          <Notifications
            listNotifications={notifications}
            unread={
              notifications &&
              notifications.length - store.get(`notifications-${listId}`)
            }
          />
        </Tab>
        {!shouldBeDisabled("search") && (
          <Tab
            key="search"
            eventKey="search"
            title="Búsqueda"
            disabled={shouldBeDisabled("search")}
          >
            <Search changeTab={handleChangeTab} listId={listId} />
          </Tab>
        )}
        {!shouldBeDisabled("share") && (
          <Tab
            key="share"
            eventKey="share"
            title="Compartir"
            disabled={shouldBeDisabled("share")}
          >
            <Share listId={listId} ownerId={list.owner_id} />
          </Tab>
        )}
        {!shouldBeDisabled("config") && (
          <Tab
            key="config"
            eventKey="configuration"
            title="Ajustes"
            disabled={shouldBeDisabled("config")}
          >
            <Config
              listId={listId}
              title={list.title}
              description={list.description}
              privacy={list.privacy}
            />
          </Tab>
        )}
      </Tabs>
    </Container>
  );
};

export default List;
