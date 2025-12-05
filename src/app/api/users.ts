import type {
  user,
  createUser,
  requestEditUser,
  requestLogin,
} from "@/src/models/users";

const USERS_URL = process.env.NEXT_PUBLIC_USERS_URL;

export async function login(requestToLogin: requestLogin): Promise<string> {
  const requestLoginJson = {
    Email: requestToLogin.email,
    Password: requestToLogin.password,
  };

  const response = await fetch(USERS_URL + "login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestLoginJson),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Error login user");
  }

  var token = await response.text();

  console.log("Token:" + token);

  localStorage.setItem("token", token);

  return token;
}

export async function createUser(userToCreate: createUser): Promise<user> {
  const createUserJson = {
    FullName: userToCreate.fullName,
    Email: userToCreate.email,
    NickName: userToCreate.nickName,
    BirthDate: userToCreate.birthDate,
    Address: userToCreate.address,
    PhoneNumber: userToCreate.phoneNumber,
    Password: userToCreate.password,
  };

  const response = await fetch(USERS_URL + "createUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createUserJson),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Error creating user");
  }

  const userCreated: user = await response.json();

  return userCreated;
}

export async function getUsers(): Promise<user[]> {
  const response = await fetch(USERS_URL + "getUsers", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Error getting users");
  }
  const users: user[] = await response.json();

  return users;
}

export async function getUserById(userId: string): Promise<user> {
  const response = await fetch(USERS_URL + "getUserById/" + userId, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Error getting user");
  }
  const userObtained: user = await response.json();

  return userObtained;
}

export async function editUser(
  userId: string,
  requestToEditUser: requestEditUser
): Promise<user> {
  const requestEditUserJson = {
    FullName: requestToEditUser.fullName,
    NickName: requestToEditUser.nickName,
  };

  const response = await fetch(USERS_URL + "editUser/" + userId, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(requestEditUserJson),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Error editing user");
  }
  const userEdited: user = await response.json();

  return userEdited;
}

export async function deleteUser(userId: string): Promise<user> {
  const response = await fetch(USERS_URL + "deleteUser/" + userId, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Error deleting user");
  }
  const userDeleted: user = await response.json();

  return userDeleted;
}
