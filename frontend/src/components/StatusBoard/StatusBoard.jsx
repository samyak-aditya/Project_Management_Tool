import React, { useState } from "react";
import styles from "./StatusBoard.module.css";
import plusIcon from "../../assets/icons/plus.svg";
import collapseAllIcon from "../../assets/icons/collapseAll.svg";
import TaskCard from "../TaskCard/TaskCard";
import TaskAddModal from "../TaskAddModal/TaskAddModal";

function StatusBoard({ tasks = [], heading, plusBtn }) {
  const [isCollapseAll, setIsCollapseAll] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openChecklistCount, setOpenChecklistCount] = useState(0);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleToggle = (isToggled) => {
    setOpenChecklistCount((prevCount) =>
      isToggled ? prevCount + 1 : prevCount - 1
    );
    setIsCollapseAll(false);
  };

  const handleCollapseAll = () => {
    if (openChecklistCount > 0) {
      setOpenChecklistCount(0);
      setIsCollapseAll(true);
    }
  };

  return (
    <div className={styles.statusBoard}>
      <div className={styles.topOfTheBoard}>
        <p>{heading}</p>
        <div>
          {plusBtn && (
            <img
              style={{ cursor: "pointer" }}
              src={plusIcon}
              alt="icon"
              onClick={handleOpenModal}
            />
          )}
          <img
            src={collapseAllIcon}
            alt="Icon"
            onClick={handleCollapseAll}
            style={{
              cursor: openChecklistCount > 0 ? "pointer" : "not-allowed",
            }}
          />
        </div>
      </div>
      {tasks.length > 0 ? (
        <div className={styles.taskCards}>
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              collapseAll={isCollapseAll}
              countOfOpenChecklist={openChecklistCount}
              onToggle={handleToggle}
              status={task?.status}
            />
          ))}
        </div>
      ) : heading !== "To do" ? (
        <div className={styles.alternateMessg}>
          Click the buttons located at the bottom of each card to move them here...
        </div>
      ) : (
        <div className={styles.alternateMessg}>
          Click on "<strong>+</strong>" button to add a new task...
        </div>
      )}

      <TaskAddModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}

export default StatusBoard;
