let selectedFile2;

document.getElementById("myFile2").addEventListener("change", (event) => {
  selectedFile2 = event.target.files[0];
});

document.getElementById("upload-button2").addEventListener("click", (e) => {
  e.preventDefault();
  let fileReader = new FileReader();

  // Read the selected file as binary string
  fileReader.readAsBinaryString(selectedFile2);

  // Process the file data when it's loaded
  fileReader.onload = (event) => {
    let fileData = event.target.result;

    // Read the Excel workbook
    let workbook = XLSX.read(
      fileData,
      { type: "binary", dateNF: "mm/dd/yyyy" } // Merge options into one object
    );

    let cal_total = [];
    let steps = [];

    // Change each sheet in the workbook to JSON
    workbook.SheetNames.forEach((sheet) => {
      const result = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], {
        raw: false,
      });

      for (let i = 0; i < result.length; i++) {
        cal_total.push(result[i].cal_total);
        steps.push(result[i].steps);
      }
    });

    console.log("Calorie sleep data: ", cal_total);
    console.log("Rem sleep data: ", steps);
  };
});

// setup is automatically called once when the page loads.
function setup() {
  // createCanvas() creates the canvas element we will be drawing to.
  var canvas = createCanvas(640, 480);
  canvas.parent("sketch3");
}
