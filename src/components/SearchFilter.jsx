import React, { useContext, useEffect, useRef, useState } from "react";
import { FaFilter, FaTimes } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { ProductContext } from "../context/ProductContext";
import productsData from "../data/productsData";
//
import { brandList, categoryList } from "../data/searchfilter";

const SearchFilter = () => {
  const { products, setProducts } = useContext(ProductContext);
  const searchfilter = useRef(null);
  const [toggle, setToggle] = useState(false);
  const toggleSearchFilter = () => {
    setToggle(!toggle);
  };
  useEffect(() => {
    toggle
      ? searchfilter.current.classList.add("active")
      : searchfilter.current.classList.remove("active");
  }, [toggle]);
  //
  const [search, setSearch] = useState("");
  const [range, setRange] = useState(0);
  const [brands, setBrands] = useState([]);
  const addBrand = (e, brand) => {
    if (e.target.checked) {
      const brandExist = brands.find((item) => {
        return item === brand;
      });
      if (!brandExist) {
        setBrands([...brands, brand]);
      }
    }
    if (!e.target.checked) {
      const filtered = brands.filter((item) => {
        return item !== brand;
      });
      setBrands(filtered);
    }
  };
  const [categories, setCategories] = useState([]);
  const addCategory = (e, category) => {
    if (e.target.checked) {
      const categoryExist = categories.find((item) => {
        return item === category;
      });
      if (!categoryExist) {
        setCategories([...categories, category]);
      }
    }
    if (!e.target.checked) {
      const filtered = categories.filter((item) => {
        return item !== category;
      });
      setCategories(filtered);
    }
  };
  const [sort, setSort] = useState("");
  const addSort = (e) => {
    setSort(e.target.dataset.type);
  };
  //
  const applyFilter = () => {
    let updated = productsData;
    //
    if (search !== "") {
      updated = updated.filter((item) => {
        return (
          item.brand.toLowerCase().includes(search.toLowerCase()) ||
          item.title.toLowerCase().includes(search.toLowerCase())
        );
      });
    }
    //
    if (range > 0) {
      updated = updated.filter((item) => {
        return parseFloat(item.price) <= parseFloat(range);
      });
    }
    //
    if (brands.length !== 0) {
      updated = updated.filter((item) => {
        return brands.includes(item.brand.toLowerCase());
      });
    }
    //
    if (categories.length !== 0) {
      updated = updated.filter((item) => {
        return categories.includes(item.category.toLowerCase());
      });
    }
    //
    setProducts(updated);
  };
  useEffect(() => {
    applyFilter();
  }, [search, sort, range, brands, categories]);
  //
  //
  // clear filters
  const clear = () => {
    setSearch("");
    setRange(0);
    setBrands([]);
    setCategories([]);
    //
    let brands_element = document.querySelectorAll(".brands_element input");
    brands_element.forEach((item) => {
      item.checked = false;
    });
    //
    let category_element = document.querySelectorAll(".category_element input");
    category_element.forEach((item) => {
      item.checked = false;
    });
  };
  //
  const rotateArrow = (e) => {
    if (e.target.dataset.arrow === e.target.childNodes[1].dataset.arrow) {
      e.target.childNodes[1].classList.toggle("rotate_arrow");
    }
  };
  return (
    <>
      <div className="container-fluid py-2 border-bottom bg-white">
        <div className="d-flex align-items-center justify-content-between">
          <p>Search & Filter</p>
          <div className="d-flex align-items-center justify-content-between gap-2">
            <input
              type="text"
              className="w-100"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={toggleSearchFilter}>
              <FaFilter className="SVGdisable" />
            </button>
          </div>
        </div>
      </div>
      <div
        className="searchfilter bg-white border-start p-2"
        ref={searchfilter}
      >
        <div className="d-flex align-items-center justify-content-between">
          <button onClick={clear}>Clear</button>
          <button onClick={toggleSearchFilter}>
            <FaTimes className="SVGdisable" />
          </button>
        </div>
        {/*  */}
        <p className="mt-4">Showing {products.length} products</p>
        {/*  */}
        <div className="mt-4">
          <div>
            <div className="d-flex align-items-center justify-content-between gap-2">
              <input
                type="range"
                min="0"
                max="2000"
                className="form-range"
                id="price-range"
                value={range}
                onChange={(e) => setRange(e.target.value)}
              />
              <div style={{ cursor: "pointer" }} onClick={() => setRange(0)}>
                <FaTimes />
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <p>
                Rs.<strong>0</strong>
              </p>
              {range === 0 ? (
                <p>
                  Rs.<strong>2000</strong>
                </p>
              ) : (
                <p>
                  Rs.<strong>{range}</strong>
                </p>
              )}
            </div>
          </div>
        </div>
        {/*  */}
        <div className="mt-4 brands_element">
          <div
            className="d-flex align-items-center justify-content-between"
            data-bs-toggle="collapse"
            href="#brand_collapse"
            role="button"
            aria-expanded="false"
            aria-controls="brand_collapse"
            data-arrow="brand_collapse"
            onClick={(e) => rotateArrow(e)}
          >
            <p className="fw-bold no-pointer">Brand</p>
            <div className="arrow no-pointer" data-arrow="brand_collapse">
              <IoIosArrowDown />
            </div>
          </div>
          <div className="collapse" id="brand_collapse">
            {brandList.map((item, index) => {
              return (
                <div
                  className="d-flex align-items-center justify-content-between"
                  key={index}
                >
                  <label className="text-capitalize">
                    {item.name}
                    <input
                      type="checkbox"
                      name={item.name}
                      onClick={(e) => addBrand(e, item.name)}
                    />
                  </label>
                </div>
              );
            })}
          </div>
        </div>
        {/*  */}
        <div className="mt-4 category_element">
          <div
            className="d-flex align-items-center justify-content-between"
            data-bs-toggle="collapse"
            href="#category_collapse"
            role="button"
            aria-expanded="false"
            aria-controls="category_collapse"
            data-arrow="category_collapse"
            onClick={(e) => rotateArrow(e)}
          >
            <p className="fw-bold no-pointer">Category</p>
            <div className="arrow no-pointer" data-arrow="category_collapse">
              <IoIosArrowDown />
            </div>
          </div>
          <div className="collapse" id="category_collapse">
            {categoryList.map((item, index) => {
              return (
                <div
                  className="d-flex align-items-center justify-content-between"
                  key={index}
                >
                  <label className="text-capitalize">
                    {item.name}
                    <input
                      type="checkbox"
                      name={item.name}
                      onClick={(e) => addCategory(e, item.name)}
                    />
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchFilter;
