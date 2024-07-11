import { useEffect, useState } from "react";
import Pagination from "./Pagination/Pagination";
import { getTotalPageCount, getUsers } from "./backend/controller";
import { User } from "./common/common.type";
import styles from "./App.module.css";

function App() {
  const [offset, setOffset] = useState<number>(1);
  const [pagesCount, setPagesCount] = useState<number>(0);
  const [userList, setUserList] = useState<User[]>([]);
  const limit: number = 10;

  useEffect(() => {
    const pagesCount: number = getTotalPageCount(limit);
    setPagesCount(pagesCount);
  }, []);

  useEffect(() => {
    const userList = getUsers(offset - 1, limit);
    setUserList(userList);
  }, [offset]);

  function updateOffset(userSelctedOffset: number) {
    setOffset(userSelctedOffset);
  }

  return (
    <div className={styles.container}>
      <h2>All Users</h2>
      <div className={styles.userContainer}>
        {userList.map((user) => (
          <div key={user.id} className={styles.userRow}>
            <strong>{user.name}</strong>
            <p>{user.contactNumber}</p>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
      <div className={styles.paginationContainer}>
        <Pagination pagesCount={pagesCount} updatePageNumber={updateOffset} />
      </div>
    </div>
  );
}

export default App;
