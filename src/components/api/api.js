import { authActions } from "../../store/Auth";
import { expenseActions } from "../../store/ExpenseStore";

const webApiKey = "AIzaSyCfXxSu_jIqAKl4YlxyKA_9RABh0ofO_OA";

export async function loginorSigninToFirebase(
  email,
  password,
  isLoginPage,
  dispatch
) {
  let url;
  if (isLoginPage) {
    url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${webApiKey}`;
  } else {
    url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${webApiKey}`;
  }
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await response.json();
    if (response.ok) {
      dispatch(
        authActions.login({
          token: data.idToken,
          email: data.email,
          isLogin: isLoginPage,
        })
      );
      if (isLoginPage) {
        localStorage.setItem("token", data.idToken);
        localStorage.setItem(
          "email",
          data.email.replace("@", "").replace(".", "").replace(".", "")
        );
      } else {
        alert(`successfully signedup ${data.email}`);
      }
    } else {
      throw new Error(data.error.message);
    }
  } catch (error) {
    alert(error.message);
  }
}

export async function sendLinkToMailFromFirebase(
  email,
  forgotPass,
  verify,
  authCurrentToken
) {
  let body;
  if (forgotPass) {
    body = JSON.stringify({
      email: email,
      requestType: "PASSWORD_RESET",
    });
  } else {
    body = JSON.stringify({
      idToken: authCurrentToken,
      requestType: "VERIFY_EMAIL",
    });
  }
  try {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${webApiKey}`,
      {
        method: "POST",
        body: body,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (response.ok) {
      alert("successfully sended link to your email");
    } else {
      throw new Error(data.error.message);
    }
  } catch (error) {
    alert(error.message);
  }
}
export async function showDetailsFromFirebase(selectToken){
  try{
    const response =await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${webApiKey}`,{
        method:"POST",
        body:JSON.stringify({
            idToken:selectToken
        }),
        headers:{
            'Content-Type':'application/json'
        }
    })
    const data = await response.json()
    if(response.ok){
      return data.users[0]
    }else{
        throw new Error(data.error.message)
    }
}catch(err){
    alert(err.message)
}
}

export async function updateDetailsInFirebase(name,photo,selectToken){
  try {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${webApiKey}`,
      {
        method: "POST",
        body: JSON.stringify({
          idToken: selectToken,
          displayName: name,
          photoUrl: photo,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    if (response.ok) {
      alert("successfully updated your profile");
    } else {
      throw new Error(data.error.message);
    }
  } catch (error) {
    alert(error.message);
  }
}


const url = "https://myweblink-6a02d-default-rtdb.firebaseio.com/";

export async function getExpensesFromFirebase(dispatch) {
const localEmail = localStorage.getItem("email");
  if(localEmail){
    try {
      const res = await fetch(`${url}${localEmail}.json`);
      const data = await res.json();
      if (res.ok) {
        for (const key in data) {
          data[key]["id"] = key;
          dispatch(expenseActions.AddExpense(data[key]));
        }
      } else {
        throw new Error(data.error.message);
      }
    } catch (err) {
      alert(err.message);
    }
  }
}

export async function storeExpenseInFirebase(expense, dispatch) {
  const localEmail = localStorage.getItem("email");
  if(localEmail){try {
    const response = await fetch(`${url}${localEmail}.json`, {
      method: "POST",
      body: JSON.stringify(expense),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (response.ok) {
      expense["id"] = data.name;
      dispatch(expenseActions.AddExpense(expense));
    } else {
      throw new Error(data.error.message);
    }
  } catch (error) {
    return alert(error.message);
  }}
}

export async function editorDeleteInFirebase(name, id, dispatch, edited) {
  const localEmail = localStorage.getItem("email");
  let obj;
  if (name === "edit") {
    obj = {
      method: "PUT",
      body: JSON.stringify(edited),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } else {
    obj = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
  try {
    const res = await fetch(`${url}${localEmail}/${id}.json`, obj);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error.message);
    } else {
      dispatch(
        expenseActions.deleteorEditExpense({
          id: id,
          name: name,
          edited: edited,
        })
      );
    }
  } catch (err) {
    alert(err.message);
    return;
  }
}
