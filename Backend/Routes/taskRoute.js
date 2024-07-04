import { Router } from 'express';
const router = Router();
import verifyJwtToken from "../middlewares/authMiddleware.js";
import { createe } from '../Controllers/TaskControllers/create.js';
import { getAll } from '../Controllers/TaskControllers/gettall.js';
import { editdata } from '../Controllers/TaskControllers/editdata.js';
import { movedata } from '../Controllers/TaskControllers/movedataa.js';
import { taskdes } from '../Controllers/TaskControllers/taskdescription.js';
import { deletetask } from '../Controllers/TaskControllers/deletetask.js';
import { analytics } from '../Controllers/TaskControllers/analytics.js';
import { checklist } from '../Controllers/TaskControllers/tasklist.js';
import { getAllEmail } from '../Controllers/TaskControllers/getallEmail.js';
import { saveSelectedEmails } from '../Controllers/TaskControllers/saveEmails.js';
import { assignTask, emailSuggestion } from '../Controllers/TaskControllers/assignTask.js';
import { addUsers } from '../Controllers/TaskControllers/addUsers.js';
// Define routes
router.post("/create", verifyJwtToken, createe);
router.get("/all", verifyJwtToken, getAll);
router.put("/edit/:taskId", verifyJwtToken, editdata);
router.put("/:taskId/move", verifyJwtToken, movedata);
router.get("/task-description/:taskId", taskdes);
router.delete("/delete-task/:taskId", verifyJwtToken, deletetask);
router.get("/analytics", verifyJwtToken, analytics);
router.put("/checklist/:taskId/:itemId", verifyJwtToken, checklist);
router.get('/users/emails', emailSuggestion);
//router.post("/users/add", verifyJwtToken, saveSelectedEmails);
router.post('/assign', assignTask);
router.post('/users/add',verifyJwtToken, addUsers);


export default router;
