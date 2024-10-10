import { PayPalButtons } from "@paypal/react-paypal-js";

const PayPalPayment = () => {

    const createOrder = async (data) => {
        //Order is created on the server and the order id is returned
        return fetch('http//localhost:8888/api/create-order', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({}),
        })
        .then((response)=>response.json)
        .then((order)=>order.id)
        
    }     

    return (
        <PayPalButtons createOrder={(data, actions) => createOrder(data, actions)}
                      onApprove={(data, actions) => onApprove(data, actions)}
        />
    );
};

export default PayPalPayment;