import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEye, AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import { deleteProduct } from "../../redux/actions/product";
import Loader from "../Layout/Loader";
import CustomModal from "../CustomModal";

const AllProducts = () => {
  const { products, isLoading } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [id, setId] = useState("");

  const [id2, setId2] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch]);

  const setOperations = async (productId) => {
    setModalOpen(true);
    setId(productId);
    console.log("1st id", id);
  };

  const sendDeleteMessage = () => {
    console.log("2nd id", id);
  };

  const setOperations2 = async (productId) => {
    setModalOpen2(true);
    setId2(productId);
    console.log("1st id", id2);
  };
  const consoleId2 = () => {
    console.log("2nd id", id2);
  };
  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },

    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        const productId = params.row.id;
        return (
          <>
            <Link to={`/product/${productId}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "Edit",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        const productId = params.row.id;
        return (
          <>
            <Button>
              <AiOutlineEdit
                onClick={() => setOperations2(productId)}
                size={20}
              />
            </Button>
          </>
        );
      },
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        const productId = params.row.id;
        return (
          <>
            <Button onClick={() => setOperations(productId)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = products?.map((item) => ({
    id: item._id,
    name: item.name,
    price: "Ksh " + item.discountPrice,
    Stock: item.stock,
    sold: item?.sold_out,
  }));

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          {modalOpen && (
            <CustomModal
              message={"Request this product be Delete?"}
              ok={" Yes, Please"}
              cancel={"No, cancel"}
              setModalOpen={setModalOpen}
              performAction={() => {
                sendDeleteMessage();
              }}
              closeModel={() => setModalOpen(false)}
            />
          )}
          {modalOpen2 && (
            <CustomModal
              message={"Request this product be edited?"}
              ok={" Yes, Please"}
              cancel={"No, cancel"}
              setModalOpen={setModalOpen}
              performAction={() => {
                consoleId2();
              }}
              closeModel={() => setModalOpen2(false)}
            />
          )}
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}
    </>
  );
};

export default AllProducts;
