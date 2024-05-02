import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import StandardTable from "./common/table";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import HttpService from "../services/http-service";
import Spinner from "react-bootstrap/Spinner";
import Select from "react-select";

function Inventory() {
  const [isLoading, setIsLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [inventory, setInventory] = useState([]);
  const [inventoryData, setInventoryData] = useState({});
  const [isInventoryFocused, setIsInventoryFocused] = useState(false);
  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const [subCategoriesOptions, setSubCategoriesOptions] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [departmentsOptions, setDepartmentsOptions] = useState([]);

  const giftCardFields = [
    "name",
    "gl_code",
    "department",
    "category",
    "sub_category",
    "unit_cost",
    "unit_price",
    "tax",
    "qty",
    "item_type",
  ];

  const columns = [
    "Name",
    "GL Code",
    "Department",
    "Category",
    "Subcategory",
    "Unit Cost",
    "Unit Price",
    "Tax(Es)",
    "QTY",
    "Item Type",
  ];

  const itemTypeOptions = [{ value: "itemType", label: "Item Type" }];

  useEffect(() => {
    getCategoriesList();
    getDepartmentsList();
    getAllSubCategoriesList("");
    getAllSubCategoriesListing();
  }, []);

  const getCategoriesList = async () => {
    try {
      const { data } = await HttpService.getAllCategoriesList({
        query: { name: "" },
      });
      const categories = data.Category;

      const options = categories.map((data) => ({
        label: data.name,
        value: data.id,
      }));
      setCategoriesOptions(options);
    } catch (err) {
      toast.error(err.data?.message);
    }
  };

  const getAllSubCategoriesList = async (category_id) => {
    try {
      const { data } = await HttpService.getAllSubCategoriesList({
        query: { category_id: category_id },
      });
      const categories = data.data;
      const options = categories.map((data) => ({
        label: data.name,
        value: data.id,
      }));
      setSubCategoriesOptions(options);
    } catch (err) {
      toast.error(err.data?.message);
    }
  };

  const getAllSubCategoriesListing = async () => {
    try {
      const {
        data: { data: categories },
      } = await HttpService.getAllSubCategoriesList({
        query: { category_id: "" },
      });
      const options = categories.map((data) => ({
        label: data.name,
        value: data.id,
      }));
      setSubCategories(options);
    } catch (err) {
      toast.error(err.data?.message);
    }
  };

  const getDepartmentsList = async () => {
    try {
      const { data } = await HttpService.getAllDepartmentsList({
        query: { name: "" },
      });
      const departments = data.Department;
      const options = departments.map((data) => ({
        label: data.name,
        value: data.id,
      }));
      setDepartmentsOptions(options);
    } catch (err) {
      toast.error(err.data?.message);
    }
  };

  const getInventoryList = async () => {
    setIsLoading(true);
    try {
      const {
        data: { data: inventory },
      } = await HttpService.getInventoriesList({
        query: { page: 1, limit: 100 },
      });

      setInventory(inventory);
    } catch (err) {
      toast.error(err.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const createInventory = async () => {
    try {
      setIsLoading(true);
      const {
        data: { message },
      } = await HttpService.createInventory({
        body: inventoryData,
      });

      getInventoryList();

      toast.success(message);
    } catch (err) {
      setIsLoading(false);
      toast.error(err.data?.message);
    }
  };

  const modifyInventory = (inventoryD) => {
    const fullInventoryObject = inventory?.find((e) => {
      return e.name === inventoryD.name;
    });

    setInventoryData(fullInventoryObject);
  };

  const updateInventory = async () => {
    let mappedInventoryData = {};

    for (let key in inventoryData) {
      if (giftCardFields.includes(key)) {
        mappedInventoryData[key] = inventoryData[key];
      }
    }

    setInventoryData(mappedInventoryData);

    try {
      setIsLoading(true);
      const {
        data: { message },
      } = await HttpService.updateInventory({
        params: inventoryData.id,
        body: mappedInventoryData,
      });

      getInventoryList();

      toast.success(message);
    } catch (err) {
      setIsLoading(false);
      toast.error(err.data?.error);
    } finally {
      setIsShowModal(false);
    }
  };

  const deleteInventory = async () => {
    try {
      setIsLoading(true);
      const {
        data: { message },
      } = await HttpService.deleteInventory({
        params: inventoryData.id,
      });

      getInventoryList();

      toast.success(message);
    } catch (err) {
      setIsLoading(false);
      toast.error(err.data?.error);
    } finally {
      setIsShowModal(false);
    }
  };

  useEffect(() => {
    getInventoryList();
  }, []);

  return (
    <Container fluid>
      <ToastContainer />
      <Modal
        className="right"
        show={isShowModal}
        onHide={() => {
          setIsShowModal(false);
        }}
        backdrop="static"
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {isInventoryFocused ? "Item Details" : "Add Item"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ overflowY: "auto", height: "calc(100vh - 138px)" }}
        >
          <Row className="row-cols-2">
            <Col>
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                value={inventoryData.name}
                onChange={(e) => {
                  setInventoryData({ ...inventoryData, name: e.target.value });
                }}
                type="text"
                disabled={isInventoryFocused}
              />
            </Col>
            <Col className="pt-2">
              <Form.Label>GL Code</Form.Label>
              <Form.Control
                value={inventoryData.gl_code}
                onChange={(e) => {
                  setInventoryData({
                    ...inventoryData,
                    gl_code: e.target.value,
                  });
                }}
                type="text"
              />
            </Col>
            <Col className="pt-2">
              <Form.Label htmlFor="inputPassword5">Department</Form.Label>
              <Select
                value={departmentsOptions?.find(
                  (c) => c.value === inventoryData.department_id
                )}
                onChange={(e) => {
                  setInventoryData({
                    ...inventoryData,
                    department_id: e.value,
                  });
                }}
                options={departmentsOptions}
              />
            </Col>

            <Col className="pt-2">
              <Form.Label htmlFor="inputPassword5">Category</Form.Label>
              <Select
                value={categoriesOptions?.find(
                  (c) => c.value === inventoryData.category_id
                )}
                onChange={(e) => {
                  getAllSubCategoriesList(e.value);
                  setInventoryData({ ...inventoryData, category_id: e.value });
                }}
                options={categoriesOptions}
              />
            </Col>

            <Col className="pt-2">
              <Form.Label htmlFor="inputPassword5">Sub Category</Form.Label>
              <Select
                value={subCategoriesOptions?.find(
                  (c) => c.value === inventoryData.sub_category_id
                )}
                onChange={(e) => {
                  setInventoryData({
                    ...inventoryData,
                    sub_category_id: e.value,
                  });
                }}
                options={subCategoriesOptions}
              />
            </Col>
            <Col className="pt-2">
              <Form.Label htmlFor="inputPassword5">Item Type</Form.Label>
              <Select
                value={itemTypeOptions?.find(
                  (c) => c.value === inventoryData.item_type
                )}
                onChange={(e) => {
                  setInventoryData({ ...inventoryData, item_type: e.value });
                }}
                options={itemTypeOptions}
              />
            </Col>
            <Col className="pt-2">
              <Form.Label htmlFor="inputPassword5">Unit Cost</Form.Label>
              <Form.Control
                value={inventoryData.unit_cost}
                onChange={(e) => {
                  setInventoryData({
                    ...inventoryData,
                    unit_cost: e.target.value,
                  });
                }}
                type="number"
              />
            </Col>

            <Col className="pt-2">
              <Form.Label htmlFor="inputPassword5">Unit Price</Form.Label>
              <Form.Control
                value={inventoryData.unit_price}
                onChange={(e) => {
                  setInventoryData({
                    ...inventoryData,
                    unit_price: e.target.value,
                  });
                }}
                type="number"
              />
            </Col>
            <Col className="pt-2">
              <Form.Label htmlFor="inputPassword5">Quantity</Form.Label>
              <Form.Control
                value={inventoryData.qty}
                onChange={(e) => {
                  setInventoryData({ ...inventoryData, qty: e.target.value });
                }}
                type="number"
              />
            </Col>
            <Col className="pt-2">
              <Form.Label htmlFor="inputPassword5">Tax(Es)</Form.Label>
              <Form.Control
                value={inventoryData.tax}
                onChange={(e) => {
                  setInventoryData({ ...inventoryData, tax: e.target.value });
                }}
                type="number"
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setIsShowModal(false);
            }}
            variant="secondary"
            disabled={isLoading}
          >
            Close
          </Button>
          {isInventoryFocused ? (
            <Button
              style={{ color: "white" }}
              onClick={deleteInventory}
              variant="danger"
              disabled={isLoading}
            >
              Delete Item
            </Button>
          ) : null}
          <Button
            style={{ color: "white" }}
            onClick={() => {
              isInventoryFocused ? updateInventory() : createInventory();
            }}
            variant="warning"
            disabled={isLoading}
          >
            {isInventoryFocused ? "Save" : "Add Item"}
          </Button>
        </Modal.Footer>
      </Modal>
      <Row>
        <Col sm={12} style={{ padding: 0 }}>
          <div className="px-2 py-3" style={styles.btnColumn}>
            {isLoading ? (
              <Spinner
                animation="border"
                role="status"
                style={{ marginRight: 10 }}
              >
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <div></div>
            )}
            <Button
              onClick={() => {
                setInventoryData({});
                setIsInventoryFocused(false);
                setIsShowModal(true);
              }}
              style={styles.addInventoryBtn}
              size="sm"
              disabled={isLoading}
            >
              New Inventory
            </Button>
          </div>
        </Col>

        <Col sm={12} style={{ padding: 0 }}>
          <div
            style={{
              height: "calc(100vh - 222px)",
              overflowY: "auto",
            }}
          >
            <StandardTable
              columns={columns}
              rows={inventory?.map((gc) => {
                const departmentName = departmentsOptions?.find(
                  (c) => c.value === gc.department_id
                );

                const categoryName = categoriesOptions?.find(
                  (c) => c.value === gc.category_id
                );
                const subCategoryName = subCategories?.find(
                  (c) => c.value === gc.sub_category_id
                );

                return {
                  name: gc.name,
                  gl_code: gc.gl_code,
                  department: departmentName?.label,
                  category: categoryName?.label,
                  sub_category: subCategoryName?.label,
                  unit_cost: gc.unit_cost,
                  unit_price: gc.unit_price,
                  tax: gc.tax,
                  qty: gc.qty,
                  item_type: gc.item_type,
                };
              })}
              handleClick={(value) => {
                setIsInventoryFocused(true);
                modifyInventory(value);
                setIsShowModal(true);
              }}
              isClickable
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

const styles = {
  btnColumn: {
    display: "flex",
    justifyContent: "right",
    backgroundColor: "white",
  },
  addInventoryBtn: {
    color: "white",
    backgroundColor: "#0CD374",
    borderRadius: 8,
    border: 0,
    padding: "8px 15px",
  },
  removeEmployeeBtn: {
    color: "white",
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#E92A2A",
    borderRadius: 8,
    border: 0,
    padding: "8px 15px",
  },
  editRightsBtn: {
    color: "white",
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#F8AD15",
    borderRadius: 8,
    border: 0,
    padding: "8px 15px",
  },
};

export default Inventory;
