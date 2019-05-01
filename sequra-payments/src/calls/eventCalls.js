import axios from 'axios';
import { ApiException } from '../SequraPayments/SequraPaymentsErrors';

const EventCalls = {
  async sendEvent(event) {
    const url = 'http://localhost:8080/events';
    try {
      axios.post(url, event);
      return true;
    } catch (error) {
      return new ApiException(error.response);
    }
  },
};

export default EventCalls;
