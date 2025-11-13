import { cookies } from "next/headers";

export async function getCookie() {
  const token = (await cookies()).get("token")?.value;
  const user = (await cookies()).get("user")?.value;
  return { token, user };
}

export async function getPayment(user: string) {
  const response = await fetch(
    `${process.env.PAYMENT_LINK!}/payment/getuser?user=${user}`
  )
    .then((e) => e.json())
    .then((e) => (e.length !== 0 ? e[0] : null));

  if (!response) return null;
  const date = new Date(response?.created_at * 1000);
  const currentDate = new Date();
  const daysPassed = Math.floor(
    (currentDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (daysPassed >= 30) {
    await fetch(
      `${process.env.PAYMENT_LINK!}/payment/unsubscribe?user=${user}`
    );
    return null;
  }

  return response;
}
