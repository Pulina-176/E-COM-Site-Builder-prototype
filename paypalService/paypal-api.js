const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PORT = 8888 } = process.env;
const base = "https://api-m.sandbox.paypal.com"; 

export async function createOrder() {
    const accessToken = await getAccessToken();
    const url = `${base}/v2/checkout/orders`;
    const response = await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: '100.00'
                }
            }]
        })
    });

    return handleResponse(response);
}

export async function capturePayment(orderID) {
    const accessToken = await getAccessToken();
    const url = `${base}/v2/checkout/orders/${orderID}/capture`;
    const response = await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
    });

    return handleResponse(response);
}

export async function getAccessToken() {
    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');
    const response = await fetch(`${base}/v1/oauth2/token`, {
        method: 'post',
        headers: {
            'Authorization': `Basic ${auth}`
        },
        body: 'grant_type=client_credentials'
    });

    
    return jsonData.access_token;

}

async function handleResponse(response) {
    if (response.status === 200 || response.status === 201) {
        return response.json();
    }

    const errorMessage = await response.text();
    throw new Error(errorMessage);
}