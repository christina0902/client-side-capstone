export const createUser = async (customer) => {
  return await fetch("http://localhost:8088/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  }).then((res) => res.json());
};
export const getUserByEmail = async (email) => {
  return await fetch(`http://localhost:8088/users?email=${email}`).then((res) =>
    res.json()
  );
};
