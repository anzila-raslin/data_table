$(document).ready(() => {
    let table = $('#myTable').DataTable();

    // Fetch data 
    $.get('./asset/js/MOCK_DATA.json', function (res, status, xhr) {
        if (status === 'success') {
            res.forEach((item) => {
                table.row.add([
                    item.Name,
                    item.Position,
                    item.Office,
                    item.Age,
                    item["Start date"],
                ]).draw();
            });
        } else {
            console.error('Failed to fetch data:', xhr.statusText);
    }
});

// Export to excel button
$('.btn').on('click', function () {
    let data = [];
    let headers = [];
    $('#myTable thead th').each(function () {
      headers.push($(this).text());
    });
    data.push(headers);

    table.rows().every(function () {
      data.push(this.data());
    });

    let worksheet = XLSX.utils.aoa_to_sheet(data);
    let workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Table Data');

    XLSX.writeFile(workbook, 'table_data.xlsx');
});
});