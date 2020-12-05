import { environment } from "../../../environments/environment";

export const Endpoint = {
  USERS: {
    BASE: environment.apiHost + "users",
    LOGIN: environment.apiHost + "users/login",
    REGISTER: environment.apiHost + "users/register",
    UPDATE: (id) => environment.apiHost + `users/update/${id}`,
    VISIBLEEMAIL: (id) => environment.apiHost + `users/visibilityEmail/${id}`,
    VISIBLEOCCUPATION: (id) =>
      environment.apiHost + `users/visibilityOccupation/${id}`,
    VISIBLEPHONE: (id) => environment.apiHost + `users/visibilityPhone/${id}`,
  },
  ACCESSORIES: {
    BASE: environment.apiHost + "accessories",
    CREATE: (id) => environment.apiHost + `accessories/create/${id}`,
    UPLOAD: (id) => environment.apiHost + `uploads/${id}`,
    PHOTO: (id) => environment.apiHost + `accessories/photo/${id}`,
    PHOTOS: (id) => environment.apiHost + `accessories/photos/${id}`,
    UPDATE: (id) => environment.apiHost + `accessories/update/${id}`,
    CHANGESTATE: (id) => environment.apiHost + `accessories/changeState/${id}`,
    DELETE: (id) => environment.apiHost + `accessories/delete/${id}`,
  },
  REFERENCES: {
    ALL: (id) => environment.apiHost + `references/${id}`,
    CREATE: environment.apiHost + "references/create",
    CHANGESTATE: (id) => environment.apiHost + `references/update/${id}`,
  },
};
