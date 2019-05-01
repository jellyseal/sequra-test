import axios from 'axios';
import { ApiException } from '../SequraPayments/SequraPaymentsErrors';

const CreditCalls = {
  async getCreditAgreement(totalWithTax) {
    const params = { totalWithTax };
    const url = 'http://localhost:8080/credit_agreements';
    try {
      const response = await axios.get(url, { params });
      return response.data;
    } catch (error) {
      return new ApiException(error.message);
    }
  },
};

export default CreditCalls;
