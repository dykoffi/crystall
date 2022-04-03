import generalDocs from "./info.json";

import userDocs from "../modules/user/user.docs.json"; 
import activityDocs from "../modules/activity/activity.docs.json"; 
import categoryDocs from "../modules/category/category.docs.json"; 
import taxeDocs from "../modules/taxe/taxe.docs.json"; 
import homeDocs from "../modules/home/home.docs.json";

export default {
    ...generalDocs,
    paths: {
        ...homeDocs, 
        ...userDocs, 
        ...activityDocs, 
        ...categoryDocs, 
        ...taxeDocs,
    }
};