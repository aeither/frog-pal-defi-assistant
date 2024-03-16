'use server';

export async function checkTokenSecurity(address: string) {
  const LINEA_TESTNET = 59140;
  let status = 0;

  const options = { method: 'GET' };

  try {
    const response = await fetch(
      `https://api.gopluslabs.io/api/v1/token_security/${LINEA_TESTNET}?contract_addresses=${address}`,
      options
    );

    const data = await response.json();
    console.log(data);
    status = data.code;
  } catch (err) {
    console.error(err);
  }

  return { status: status };
}
