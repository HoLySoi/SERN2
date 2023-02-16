import { memo, useEffect, useRef, useState } from "react";
import _ from "lodash";
import { searchAll } from "../../services/userService";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils";
import "./searchAll.scss";

const SearchAll = (props) => {
  const { language, history } = props;
  const [data, setData] = useState({});
  const [showSearch, setShowSearch] = useState(false);
  const [value, setValue] = useState(null);
  const ref = useRef(null);

  const initData = async (search = "") => {
    const res = await searchAll(search);
    if (res && res.errCode === 0) {
      setData(res.data ? res.data : {});
    }
  };

  useEffect(() => {
    initData("");
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
      value !== null && initData(value);
    }, 500);

    return () => {
      debounce && clearTimeout(debounce);
    };
  }, [value]);

  const handleChangeValue = (e) => {
    setValue(e.target.value);
  };

  const handleClick = (item, key) => {
    let nav = "/home";
    if (key === "doctor") {
      nav = `/detail-doctor/${item.id}`;
    } else if (key === "specialty") {
      nav = `/detail-specialty/${item.id}`;
    } else if (key === "clinic") {
      nav = `/detail-clinic/${item.id}`;
    }
    history.push(nav);
  };

  const renderSearchList = () => {
    return Object.keys(data).map((key) => {
      return (
        <>
          {!_.isEmpty(data[key]) && (
            <div className="search-title">
              <FormattedMessage id={`show-more.${key}`} />
            </div>
          )}
          {data[key].map((item) => {
            let name = "";
            if (key === "doctor") {
              let position =
                language === LANGUAGES.VI
                  ? item.positionData.valueVi
                  : item.positionData.valueEn;
              name = `${position} ${item.firstName} ${item.lastName}`;
            } else {
              name = item.name;
            }
            return (
              <div
                className="search-item"
                onClick={() => {
                  handleClick(item, key);
                }}
              >
                <img alt="" src={item?.image} />
                <div>{name}</div>
                {/* {key === "doctor" && <div>{}</div>} */}
              </div>
            );
          })}
        </>
      );
    });
  };

  useEffect(() => {
    const element = document.getElementById("homePage-search-all");
    const handleClick = (event) => {
      setShowSearch(ref?.current?.contains(event?.target));
    };
    if (element) {
      document.addEventListener("click", handleClick);
    }

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div ref={ref} id="homePage-search-all" className="search">
      <i className="fas fa-search"></i>
      <input
        onChange={handleChangeValue}
        type="text"
        placeholder="Tìm kiếm / search"
      />

      {showSearch && <div className="search-list">{renderSearchList()}</div>}
    </div>
  );
};

export default memo(SearchAll);
