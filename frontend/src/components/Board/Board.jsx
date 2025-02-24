import React, { useContext, useEffect, useState } from "react";
import styles from "./Board.module.css";
import StatusBoard from "../StatusBoard/StatusBoard";
import { getUserInfo, getCurrentDate } from "../../utils/helper";
import MyContext from "../ContextApi/MyContext"; 
import ActionModal from "../ActionModal/ActionModal";
import AddUserModal from "./addUserModal";

function Board() {
  const [topPageInfo, setTopPageInfo] = useState({
    username: "",
    date: "",
  });
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  const {
    tasks,
    fetchTasks,
    selectedOption,
    setSelectedOption,
    isDeleteModalOpen,
    handleCloseDeleteModal,
    handleDeleteTask,
  } = useContext(MyContext);

  useEffect(() => {
    const userInfo = getUserInfo();
    const todayDate = getCurrentDate();
    setTopPageInfo({ username: userInfo, date: todayDate });
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [selectedOption]);

  const handleOpenAddUserModal = () => {
    setIsAddUserModalOpen(true);
  };

  const handleCloseAddUserModal = () => {
    setIsAddUserModalOpen(false);
  };

  return (
    <div className={styles.mainBoardSection}>
      <div className={styles.topHeadings}>
        <p className={styles.username}>Welcome! {topPageInfo.username}</p>
        <p className={styles.date}>{topPageInfo.date}</p>
      </div>
      <div className={styles.midSection}>
        <p className={styles.pageHeading}>
          Board
          <button onClick={handleOpenAddUserModal} className={styles.addUserButton}>
            Add User
          </button>
        </p>
        <select
          value={selectedOption}
          className={styles.selectBtn}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="today">Today</option>
          <option value="thisWeek">This week</option>
          <option value="thisMonth">This month</option>
        </select>
      </div>
      <div className={styles.lastSection}>
        <StatusBoard
          heading="Backlog"
          status="backlog"
          plusBtn={false}
          tasks={tasks?.filter((task) => task.status === "backlog")}
        />
        <StatusBoard
          status="todo"
          heading="To do"
          plusBtn={true}
          tasks={tasks?.filter((task) => task.status === "todo")}
        />
        <StatusBoard
          status="progress"
          heading="In progress"
          plusBtn={false}
          tasks={tasks?.filter((task) => task.status === "progress")}
        />
        <StatusBoard
          status="done"
          heading="Done"
          plusBtn={false}
          tasks={tasks?.filter((task) => task.status === "done")}
        />
      </div>
      <ActionModal
        name="Delete"
        handleAction={handleDeleteTask}
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
      />
      <AddUserModal isOpen={isAddUserModalOpen} onClose={handleCloseAddUserModal} />
    </div>
  );
}

export default Board;
