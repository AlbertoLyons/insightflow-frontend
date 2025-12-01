import type { user, createUser, requestEditUser } from "@/src/models/users";

const USERS_URL = process.env.NEXT_PUBLIC_USERS_URL;

async function createUser(userToCreate: createUser): Promise<user> {
  const formData = new FormData();
  // Agregar los campos al FormData
  formData.append("FullName", userToCreate.fullName);
  formData.append("Email", userToCreate.email);
  formData.append("NickName", userToCreate.nickName);
  formData.append("BirthDate", userToCreate.birthDate);
  formData.append("Address", userToCreate.address);
  formData.append("PhoneNumber", userToCreate.phoneNumber.toString());
  formData.append("Password", userToCreate.password);

  const response = await fetch(USERS_URL + "createUser", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Error creating user");
  }

  const userCreated: user = await response.json();

  return userCreated;
}

async function getUsers(): Promise<user[]> {
  const response = await fetch(USERS_URL + "getUsers");

  if (!response.ok) {
    throw new Error("Error getting users");
  }
  const users: user[] = await response.json();

  return users;
}

async function getUserById(userId: string): Promise<user> {
  const response = await fetch(USERS_URL + "getUserById/" + userId);

  if (!response.ok) {
    throw new Error("Error getting user");
  }
  const userObtained: user = await response.json();

  return userObtained;
}

async function editUser(
  userId: string,
  requestToEditUser: requestEditUser
): Promise<user> {
  const response = await fetch(USERS_URL + "editUser/" + userId, {
    method: "PUT",
  });

  if (!response.ok) {
    throw new Error("Error editing user");
  }
  const userEdited: user = await response.json();

  return userEdited;
}

async function deleteUser(userId: string): Promise<user> {
  const response = await fetch(USERS_URL + "deleteUser/" + userId, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error deleting user");
  }
  const userDeleted: user = await response.json();

  return userDeleted;
}
