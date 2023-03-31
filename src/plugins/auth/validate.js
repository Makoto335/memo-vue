import axios from "axios";
import { ref } from "vue";
import errorHandler from "../errorHandler";
import removeItem from "./removeItem";

const error = ref(null);

const validate = async () => {
  error.value = null;
  const uid = window.localStorage.getItem("uid");
  const client = window.localStorage.getItem("client");
  const accessToken = window.localStorage.getItem("access-token");

  try {
    const res = await axios.get(
      "https://simple-memo-rails.herokuapp.com/api/v1/auth/validate_token",
      {
        headers: {
          uid: uid,
          "access-token": accessToken,
          client: client,
        },
      }
    );
    return res;
  } catch (err) {
    errorHandler(err);
    error.value = "認証に失敗しました";
    removeItem();
  }
};

const useValidate = () => {
  return { error, validate };
};

export default useValidate;
