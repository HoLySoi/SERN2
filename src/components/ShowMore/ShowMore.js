import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Spinner } from "reactstrap";
import { LANGUAGES } from "../../utils";
import "./ShowMore.scss";
import { Link } from "react-router-dom";

const ShowMore = (props) => {
  const { title, subTitle, onClose, data, language, onClick, onSubmit, type } =
    props;
  const [value, setValue] = useState(null);
  const handleChangeValue = (e) => {
    setValue(e.target.value);
  };
  useEffect(() => {
    const debounce = setTimeout(() => {
      value !== null && onSubmit(value);
    }, 500);

    return () => {
      debounce && clearTimeout(debounce);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const getImageBase64 = (item) => {
    let imageBase64 = "";
    if (type === "handbook") {
      return <img src={item.image} alt={item.name} className={`${type}-img`} />
    }
    if (type === "clinic" || type === "specialty") {
      imageBase64 = item.image;
    } else if (item.image) {
      imageBase64 = new Buffer(item.image, "base64").toString("binary");
    }

    return <img alt="" src={imageBase64} className={`${type}-img`} />;
  };

  const getContent = (item) => {
    if (type === "doctor") {
      let nameVi = `${item.positionData.valueVi} ${item.lastName} ${item.firstName} `;
      let nameEn = `${item.positionData.valueEn} ${item.firstName} ${item.lastName} `;

      return language === LANGUAGES.VI ? nameVi : nameEn;
    }
    if (type === "handbook") {
      return item.name;
    }
    if (type === "clinic" || type === "specialty") {
      return item.name;
    }
  };

  const getDescription = (item) => {
    if (type === "doctor") {
      return "Da liễu";
    }
    if (type === "clinic") {
      return "";
    }
  };

  return (
    <div className="showMore">
      <div className="showMore-header">
        <Link to="/home">
          <i className="fa fa-arrow-left" onClick={onClose}></i>
        </Link>
        <h2>{title}</h2>
      </div>
      {onSubmit && <div className="input-search">
        <input
          placeholder={
            language === LANGUAGES.VI ? "Nhập tìm kiếm" : "Input to search"
          }
          onChange={handleChangeValue}
        />
      </div>}
      {subTitle && <h3>{subTitle}</h3>}
      <div className="show-more data-list">
        {!data && <Spinner />}
        {data &&
          data.map((item, index) => {
            return (
              <div
                className="show-more-lineItem"
                onClick={() => onClick(item)}
                key={index}
              >
                {getImageBase64(item)}
                <div className="lineItem-text">
                  <h3>{getContent(item)}</h3>
                  <h4>{getDescription(item)}</h4>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ShowMore;
