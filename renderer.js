let todos = [];
let editIndex = -1;
const keyword = document.querySelector("#keyword");
const campaign = document.querySelector("#campaign");
const productName = document.querySelector("#productName");
const start = document.querySelector("#start");
const end = document.querySelector("#end");
const dailyBudget = document.querySelector("#dailyBudget");
const sku = document.querySelector("#sku");
const bid = document.querySelector("#bid");
const todoList = document.querySelector(".todo-list");
const addButton = document.querySelector("#addBtn");
const todo_main = document.querySelector(".todos");
const exportExcel = document.getElementById("exportExcel");

function createArrayFrom2Number(start, end) {
  var result = [];

  for (var i = start; i <= end; i++) {
    result.push(i);
  }

  return result;
}

function formatDateToYYYYMMDD(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}${month}${day}`;
}

function clearAllInput() {
  keyword.value = "";
  campaign.value = "";
  productName.value = "";
  start.value = "";
  end.value = "";
  dailyBudget.value = "";
  sku.value = "";
  bid.value = "";
}

function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = "li";

    const label = document.createElement("label");
    label.className = "form-check-label";

    const spanText = document.createElement("span");
    spanText.className = "todo-text";
    spanText.textContent = `${todo.keyword}`;

    const deleteButton = document.createElement("span");
    deleteButton.className = "span-button";
    deleteButton.innerHTML = "<i >Xóa</i>";
    deleteButton.addEventListener("click", () => deleteTodo(index));

    const editButton = document.createElement("span");
    editButton.className = "span-button";
    editButton.innerHTML = '<i">Sửa</i>';
    editButton.addEventListener("click", () => editTodo(index));

    li.appendChild(label);
    li.appendChild(spanText);
    li.appendChild(deleteButton);
    li.appendChild(editButton);

    todoList.appendChild(li);
  });
}
function addTodo() {
  const keywordV = keyword.value.trim();
  const campaignV = campaign.value.trim();
  const productNameV = productName.value.trim();
  const startV = start.value.trim();
  const endV = end.value.trim();
  const dailyBudgetV = dailyBudget.value.trim();
  const skuV = sku.value.trim();
  const bidV = bid.value.trim();
  if (
    keywordV !== "" &&
    campaignV !== "" &&
    productNameV !== "" &&
    startV !== "" &&
    endV !== "" &&
    dailyBudgetV !== "" &&
    skuV !== "" &&
    bidV !== ""
  ) {
    const id = new Date().getTime();
    if (editIndex === -1) {
      const indexFromToStart = createArrayFrom2Number(
        Number(start.value.trim()),
        Number(end.value.trim())
      );
      for (let index = 0; index < keywordV.split("\n").filter(k => k.trim() !== '').length; index++) {
        const element = keywordV.split("\n").filter(k => k.trim() !== '')[index];
        todos.push({
          id,
          keyword: element,
          campaign: campaignV,
          productName: productNameV,
          index: indexFromToStart[index],
          dailyBudget: dailyBudgetV,
          sku: skuV,
          bid: bidV,
        });
      }
    } else {
      todos[editIndex].keyword = keywordV;
      editIndex = -1;
      addButton.style.display = "inline";
    }
    renderTodos();
    clearAllInput();
  } else {
    alert("Thông tin nhập còn thiếu");
    return
  }

  return false;
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

function editTodo(index) {
  const todoText = todos[index].text;
  keyword.value = todoText;
  editIndex = index;
}

function onKeyUp(event) {
  if (event.key === "Enter") {
    addTodo();
  }
}

function exportAndDownloadExcel() {
  const datas = [];
  const currentDate = new Date();
  for (let i = 0; i < todos.length; i++) {
    const element = todos[i];
    console.log(element);
    for (let j = 0; j < 4; j++) {
      if (j === 0) {
        datas.push({
          Product: "Sponsored Products",
          Entity: "Campaign",
          Operation: "Create",
          "Campaign ID": `${element.campaign} ${element.index || ""} - ${element.productName
            }`,
          "Ad Group ID": "",
          "Portfolio ID": "",
          "Ad ID": "",
          "Keyword ID": "",
          "Product Targeting ID": "",
          "Campaign Name": `${element.campaign} ${element.index || ""} - ${element.productName
            }`,
          "Ad Group Name": "",
          "Start Date": formatDateToYYYYMMDD(currentDate),
          "End Date": "",
          "Targeting Type": "MANUAL",
          State: "enabled",
          "Daily Budget": element.dailyBudget,
          SKU: "",
          "Ad Group Default Bid": "",
          Bid: "",
          "Keyword Text": "",
          "Match Type": "",
          "Bidding Strategy": "Dynamic bids - down only",
          Placement: "",
          Percentage: "",
          "Product Targeting Expression": "",
        });
      } else if (j === 1) {
        datas.push({
          Product: "Sponsored Products",
          Entity: "Ad Group",
          Operation: "Create",
          "Campaign ID": `${element.campaign} ${element.index || ""} - ${element.productName
            }`,
          "Ad Group ID": `${element.campaign} ${element.index || ""} - ${element.productName
            }`,
          "Portfolio ID": element.productName,
          "Ad ID": "",
          "Keyword ID": "",
          "Product Targeting ID": "",
          "Campaign Name": "",
          "Ad Group Name": `${element.campaign} ${element.index || ""} - ${element.productName
            }`,
          "Start Date": "",
          "End Date": "",
          "Targeting Type": "",
          State: "enabled",
          "Daily Budget": "",
          SKU: "",
          "Ad Group Default Bid": "0.1",
          Bid: "",
          "Keyword Text": "",
          "Match Type": "",
          "Bidding Strategy": "",
          Placement: "",
          Percentage: "",
          "Product Targeting Expression": "",
        });
      } else if (j === 2) {
        datas.push({
          Product: "Sponsored Products",
          Entity: "Product Ad",
          Operation: "Create",
          "Campaign ID": `${element.campaign} ${element.index || ""} - ${element.productName
            }`,
          "Ad Group ID": `${element.campaign} ${element.index || ""} - ${element.productName
            }`,
          "Portfolio ID": element.productName,
          "Ad ID": "",
          "Keyword ID": "",
          "Product Targeting ID": "",
          "Campaign Name": "",
          "Ad Group Name": "",
          "Start Date": "",
          "End Date": "",
          "Targeting Type": "",
          State: "enabled",
          "Daily Budget": "",
          SKU: element.sku,
          "Ad Group Default Bid": "",
          Bid: "",
          "Keyword Text": "",
          "Match Type": "",
          "Bidding Strategy": "",
          Placement: "",
          Percentage: "",
          "Product Targeting Expression": "",
        });
      } else {
        datas.push({
          Product: "Sponsored Products",
          Entity: "Keyword",
          Operation: "Create",
          "Campaign ID": `${element.campaign} ${element.index || ""} - ${element.productName
            }`,
          "Ad Group ID": `${element.campaign} ${element.index || ""} - ${element.productName
            }`,
          "Portfolio ID": element.productName,
          "Ad ID": "",
          "Keyword ID": "",
          "Product Targeting ID": "",
          "Campaign Name": "",
          "Ad Group Name": "",
          "Start Date": "",
          "End Date": "",
          "Targeting Type": "",
          State: "enabled",
          "Daily Budget": "",
          SKU: "",
          "Ad Group Default Bid": "",
          Bid: element.bid,
          "Keyword Text": element.keyword,
          "Match Type": "exact",
          "Bidding Strategy": "",
          Placement: "",
          Percentage: "",
          "Product Targeting Expression": "",
        });
      }
    }
  }

  const workbook = {
    Sheets: {
      'Sponsored Products Campaigns': XLSX.utils.json_to_sheet(datas),
    },
    SheetNames: ["Sponsored Products Campaigns"],
  };
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });
  const dataExcel = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });
  saveAs(dataExcel, `${todos[0].campaign}_${todos[0].index}-${todos[todos.length - 1].index}_${todos[0].productName}.xlsx`);
  todos = [];
  renderTodos();
}

addButton.addEventListener("click", addTodo);
exportExcel.addEventListener("click", exportAndDownloadExcel);
campaign.addEventListener("keyup", onKeyUp);
productName.addEventListener("keyup", onKeyUp);
start.addEventListener("keyup", onKeyUp);
end.addEventListener("keyup", onKeyUp);
dailyBudget.addEventListener("keyup", onKeyUp);
sku.addEventListener("keyup", onKeyUp);
bid.addEventListener("keyup", onKeyUp);
