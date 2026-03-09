import { useState } from 'react';
import { ticketList } from '../../Service/Tickets';
import { userDetail } from '../../Service/Login';

export default function useTicketData(gameId, userId) {
  const [ticketData, setTicketData] = useState([]);
  const [userData, setUserData] = useState({});
  const [loader, setLoader] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchUserData = async () => {
    setLoader(true);
    try {
      const response = await userDetail(userId);
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoader(false);
    }
  };

  const fetchTickets = async () => {
    setLoader(true);
    try {
      const response = await ticketList(gameId, userId);
      setTicketData(response.data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    } finally {
      setLoader(false);
    }
  };

  const refreshData = () => {
    setRefreshing(true);
    setTimeout(() => {
      fetchTickets();
      setRefreshing(false);
    }, 2000);
  };

  return {
    ticketData,
    userData,
    loader,
    refreshing,
    fetchUserData,
    fetchTickets,
    refreshData,
    setLoader
  };
}