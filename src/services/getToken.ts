// workaround to read cookies in client components
export default async function getToken(): Promise<string | null> {
  const res = await fetch('/api/auth/session', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (res.status === 200) return (await res.json()).data;

  return null;
}
