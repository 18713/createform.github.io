const form = document.querySelector("#myForm");
const submitBtn = document.querySelector("#submitBtn");

// # handle unique errors
const errors = new Set();

document.addEventListener("DOMContentLoaded", () => {
  attachEvent();
  submitForm();
});

function attachEvent() {
  form.addEventListener("keyup", (e) => {
    e.preventDefault();
    if (e.target.nodeName == "INPUT") {
      // # validate our form field
      validateFormField(e.target);
    }
  });
}

function submitForm() {
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    // # validate form state
    manageState().validateFormState();
    // # check if theres errors
    if (errors.size == 0) {
      console.log("form submitted");
    } else {
      console.log("error occurred", errors);
    }
  });
}

function manageState() {
  return {
    addToState: (target) => {
      const { id, nextElementSibling } = target;
      nextElementSibling.classList.remove("hide");
      // # add our error to state
      errors.add(id);
    },
    removeFromState: (target) => {
      const { id, nextElementSibling } = target;
      nextElementSibling.classList.add("hide");
      // # delete our error to state
      errors.delete(id);
    },
    validateFormState: () => {
      if (errors.size > 0) {
        return false;
      }

      if (errors.size == 0) {
        validateRule().checkEmptyField();
        return true;
      }
    },
  };
}

function validateFormField(target) {
  !validateRule()[target.id](target.value)
    ? manageState().addToState(target)
    : manageState().removeFromState(target);
}

function validateRule() {
  return {
    fullName: (value) => {
      if (value == null || value == undefined || value.length < 6) {
        return false;
      }

      return true;
    },
    email: (value) => {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!pattern.test(value)) {
        return false;
      }

      return true;
    },
    password: (value) => {
      if (value == null || value == undefined || value.length < 6) {
        return false;
      }

      return true;
    },
    checkEmptyField: () => {
      const inputFields = [...form.elements].filter(
        (item) => item.nodeName == "INPUT"
      );

      for (const input of inputFields) {
        const { value } = input;

        !value
          ? manageState().addToState(input)
          : manageState().removeFromState(input);
      }
    },
  };
}
