import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    loaded: "Loaded state from local storage.",
    addedEntry: "You've added an entry.",
    editedEntry: "You've edited an entry.",
    deletedEntry: "You've deleted an entry.",
    resetLog: "You've reset your log.",
  },
});

export default strings;
