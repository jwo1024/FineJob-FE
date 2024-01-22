"use client";

import styles from "@/styles/JobSearchFilter.module.scss";
import CheckBox from "@/components/CheckBox";

import {IconBriefCase, IconBuilding, IconMap, IconStack, IconToggleDown, IconToogleRight,} from "@/components/Icons";

import {useEffect, useState} from "react";


export default function JobSearchFilter() {
  const normalClassName = `${styles.categoryType}`;
  const activeClassName = `${styles.categoryType} ${styles.active}`;

  const [regionClassName, setRigionClassName] = useState(normalClassName);
  const [industryClassName, setIndustryClassName] = useState(activeClassName);
  const [jobClassName, setJobClassName] = useState(normalClassName);
  const [detailClassName, setDetailClassName] = useState(normalClassName);

  const [category, setCategory] = useState("산업");

  const [selectedData, setSelectedData] = useState<any[]>([]);

  const handleClick = (nowCategory: string) => {

    setCategory((category) => {
      if (category === nowCategory) nowCategory;
      if (category === "지역") setRigionClassName(normalClassName);
      else if (category === "산업") setIndustryClassName(normalClassName);
      else if (category === "직업") setJobClassName(normalClassName);
      else if (category === "상세") setDetailClassName(normalClassName);

      if (nowCategory === "지역") setRigionClassName(activeClassName);
      else if (nowCategory === "산업") setIndustryClassName(activeClassName);
      else if (nowCategory === "직업") setJobClassName(activeClassName);
      else if (nowCategory === "상세") setDetailClassName(activeClassName);

      return nowCategory;
    });
  };
  function searchHandler() {
    //이 부분 에서 데이터 보내기
  }

  return (
    <section className={styles.jobSearchFilter}>
      <ul className={styles.category}>
        <li className={regionClassName} onClick={() => handleClick("지역")}>
          <IconMap />
          <button>지역 선택</button>
          <IconToggleDown />
        </li>
        <li className={industryClassName} onClick={() => handleClick("산업")}>
          <IconBuilding />
          <button>산업 선택</button>
          <IconToggleDown />
        </li>
        <li className={jobClassName} onClick={() => handleClick("직업")}>
          <IconBriefCase />
          <button>직업 선택</button>
          <IconToggleDown />
        </li>
        <li className={detailClassName} onClick={() => handleClick("상세")}>
          <IconStack />
          <button>상세 선택</button>
          <IconToggleDown />
        </li>
      </ul>

      <FilterLists category={category} setSelectedData={setSelectedData}  />
      <div className={styles.searchButton}>
        <button onClick={searchHandler}> 선택된 62,272건 검색하기</button>
        {/*검색 동작 설정*/}
      </div>
    </section>
  );
}

// FilterLists

interface IMainCategory {
  id: number;
  typeOfBusinessCode: string;
  typeOfBusiness: string;
}

interface IMajorCategory {
  id: number;
  typeOfBusiness: string; //이부분 변경
  relatedMainCategory: IMainCategory;
}

interface ISubCategory {
  id: number;
  typeOfBusiness: string;
  relatedMaJorCategory: IMajorCategory;
}

function FilterLists({ category , setSelectedData }: { category: string , setSelectedData: React.Dispatch<React.SetStateAction<any[]>> }) {
  const [mainList, setMainList] = useState<IMainCategory[]>([]);
  const [majorList, setMajorList] = useState<IMajorCategory[]>([]);
  const [subList, setSubList] = useState<ISubCategory[]>([]);

  const [checkedMainId, setCheckedMainId] = useState<number | null>(0);
  const [checkedMajorId, setCheckedMajorId] = useState<number[] | null>(null);
  const [checkedSubId, setCheckedSubId] = useState<number[] | null>(null);

  // useEffect(() => {
  //   // 임시 json 파일 연결
  //   setMainList(mainCategorylist);
  //   setMajorList(majorCategorylist);
  //   setSubList(subCategoryList);
  //   setCheckedMainId(0);
  //   setCheckedMajorId([0]);
  // }, []);

  useEffect(() => {
    // TODO : BE api 연결
    // category : "지역", "산업", "직업", "상세"
    /* ex) */
    category = "mainCategories";
    fetch(`http://localhost:8080/api/${category}`)
      .then((res) => res.json())
      .then((data) => {
        // mainList, majorList, subList json 파일 연결
        setMainList(data);
        console.log(data)
      });
  }, [category]);

  useEffect(() => {
    // TODO : BE api 연결
    // category : "지역", "산업", "직업", "상세"
    /* ex) */
    category = "majorCategories";

    fetch(`http://localhost:8080/api/${category}`)
        .then((res) => res.json())
        .then((data) => {
          // mainList, majorList, subList json 파일 연결
          setMajorList(data);
          // setMajorList(data.majorList);
          // setSubList(data.subList);
          console.log(data)
        });
  }, [category]);
  useEffect(() => {
    // TODO : BE api 연결
    // category : "지역", "산업", "직업", "상세"
    /* ex) */
    category = "majorCategories";

    fetch(`http://localhost:8080/api/${category}`)
        .then((res) => res.json())
        .then((data) => {
          // mainList, majorList, subList json 파일 연결
          setMajorList(data);
          console.log(data)
        });
  }, [category]);
  useEffect(() => {
    // TODO : BE api 연결
    // category : "지역", "산업", "직업", "상세"
    /* ex) */
    category = "subCategories";

    fetch(`http://localhost:8080/api/${category}`)
        .then((res) => res.json())
        .then((data) => {
          setSubList(data);
          console.log(data)
        });
  }, [category]);

  const handleMainClick = (id: number) => {
    setCheckedMainId(id);
    setCheckedMajorId(
      majorList
        .filter((major) => major.relatedMainCategory.id === id)
        .map((major) => major.id)
    );
  };

  const handleMajorClick = (id: number) => {
    setCheckedMajorId((checkedMajorId) => {
      if (checkedMajorId?.includes(id)) {
        return checkedMajorId.filter((checkedId) => checkedId !== id);
      } else {
        return checkedMajorId ? [...checkedMajorId, id] : [id];
      }
    });
  };
  const handleSubClick = (id: number) => {

  };

  return (
    <section className={styles.filter}>
      {/* Main */}
      <ul className={styles.filterMain}>
        {mainList?.map((main) => (
          <li
            className={checkedMainId == main.id ? styles.active : ""}
            key={main.id}
            onClick={() => handleMainClick(main.id)}
          >
            <span className={styles.name}>{main.typeOfBusiness}</span>
            <span className={styles.number}>(54,232)</span>
            {checkedMainId == main.id ? (
              <span className={styles.toggle}>
                <IconToogleRight />
              </span>
            ) : undefined}
          </li>
        ))}
      </ul>

      {/* Major */}
      <ul className={styles.filterMajor}>
        {majorList
          ?.filter((major) => checkedMainId === major.relatedMainCategory.id)
          .map((major) => (
            <li key={major.id} onClick={() => handleMajorClick(major.id)}>
              <CheckBox
                checked={checkedMajorId?.includes(major.id)}
                id={`major.${major.id}`}
              >
                <span className={styles.name}>{major.typeOfBusiness}</span>
                <span className={styles.number}>(54,232)</span>
              </CheckBox>
            </li>
          ))}
      </ul>

      {/* Sub */}
      <ul className={styles.filterSub}>
        {checkedMajorId &&
          subList
            ?.filter((sub) =>
              checkedMajorId.includes(sub.relatedMaJorCategory.id)
            )
            .map((sub) => (
              <li key={sub.id}>
                {/* checked={true} */}
                <CheckBox  id={`sub${sub.id}`}>
                  <span className={styles.name}>{sub.typeOfBusiness}</span>
                  <span className={styles.number}>(54,232)</span>
                </CheckBox>
              </li>
            ))}
      </ul>


    </section>
  );
}
