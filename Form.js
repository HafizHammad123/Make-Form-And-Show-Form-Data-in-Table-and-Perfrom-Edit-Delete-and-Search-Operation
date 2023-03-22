// console.log(document.querySelectorAll('input'));

// get store product details in these variables start

let Product_Name;
let Category_Name;
let Product_Price;
let Product_Quanitty;


// get store product details in these variables end 

// Validation Variable of Form start here

const Product_And_Category_Name_Regex = /^[a-zA-Z ]+$/;
const Prodcut_Price_And_Quanitty_Regex = /^[0-9]+$/;
let Product_Name_Test;
let Product_Category_Name_Test;
let Product_Price_Test;
let Product_Quantity_Test;

// Validation Variable of Form end here

// Get ID and Value Variable are start written here

let ID;
let Value

// Get ID and Value Variable are end written here

//Get Send error message when wrong data enter variable wriitten start here
const error_message = document.getElementById('error_message');

//Get Send error message when wrong data enter variable wriitten end here

// Oninput Fucntion start here

const Get_Form_Items = document.querySelectorAll('input')
console.log(Get_Form_Items);

Get_Form_Items.forEach(Form_Items => {
    Form_Items.addEventListener('input', (e) => {
        ID = e.target.id;
        Value = e.target.value;
        if (ID === "Product_Name") {
            Product_Name_Test = Product_And_Category_Name_Regex.test(Value)
            Product_Name_Test ? (Product_Name = Value, error_message.textContent = 'Correct Product Name', error_message.style.color = '#020080') : (error_message.textContent = 'Enter Only Aplhabets in Product Name', error_message.style.color = 'red');

        }
        else if (ID === "Category_name") {
            Product_Category_Name_Test = Product_And_Category_Name_Regex.test(Value)
            Product_Category_Name_Test ? (Category_Name = Value, error_message.textContent = 'Correct Category Name', error_message.style.color = '#020080') : (error_message.textContent = 'Enter Only Aplhabets in Product Category Name', error_message.style.color = 'red')
        }
        else if (ID === "product_price") {
            Product_Price_Test = Prodcut_Price_And_Quanitty_Regex.test(Value)
            Product_Price_Test ? (Product_Price = Value, error_message.textContent = 'Correct Product Price', error_message.style.color = '#020080') : (error_message.textContent = 'Enter Only Number in Product Price', error_message.style.color = 'red')
        }
        else if (ID === "product_quantity") {
            Product_Quantity_Test = Prodcut_Price_And_Quanitty_Regex.test(Value);
            Product_Quantity_Test ? (Product_Quanitty = Value, error_message.textContent = 'Correct Product Quantity', error_message.style.color = '#020080') : (error_message.textContent = 'Enter Only Number in Product Quantity', error_message.style.color = 'red')
        }


    })
})

// Oninput Fucntion close here


// Submit Function start here

const Array_of_object = [];
const table = document.querySelector('.table_for_data');
const tbody = document.querySelector('tbody')
const search_bar = document.querySelector('input[type="search"]')



const main_form = document.querySelector('form');
const form_box = document.querySelector('.form')

main_form.addEventListener('submit', (e) => {
    e.preventDefault()

    if (Product_Name_Test === false) {
        error_message.textContent = 'Enter Only Aplhabets in Product Name',
            error_message.style.color = 'red';
        document.getElementById('Product_Name').focus()
    }
    else if (Product_Category_Name_Test === false) {
        error_message.textContent = 'Enter Only Aplhabets in Product Category Name',
            error_message.style.color = 'red';
        document.getElementById('Category_name').focus()
    }
    else if (Product_Price_Test === false) {
        error_message.textContent = 'Enter Only Number in Product Price';
        error_message.style.color = 'red';
        document.getElementById('product_price').focus()

    }
    else if (Product_Quantity_Test === false) {
        error_message.textContent = 'Enter Only Number in Product Quantity';
        error_message.style.color = 'red';
    }
    else {
        console.log("form submit")
        error_message.textContent = undefined
        const Store_Form_Data = {}
        Store_Form_Data.Product_name = Product_Name;
        Store_Form_Data.Category_name = Category_Name;
        Store_Form_Data.Product_price = Product_Price;
        Store_Form_Data.Product_quantity = Product_Quanitty;
        console.log(Store_Form_Data)
        Array_of_object.push(Store_Form_Data)
        console.log(Array_of_object)
        localStorage.setItem('Form_Data', JSON.stringify(Array_of_object))
        main_form.reset();
        search_bar.classList.remove('dnone')
        table.classList.remove('dnone')
        table.classList.add('dtable')
        tbody.innerHTML = ''

        // Form Data render using for each loop start here

        Array_of_object.forEach(render_form_data => {
            let tr = document.createElement('tr')
            tr.className = 'table_row'
            tbody.appendChild(tr)
            for (const key in render_form_data) {
                if (key === 'ProductImage') {
                    let save_path = render_form_data[key];
                    let td = document.createElement('td');
                    tr.appendChild(td)

                }
                else {
                    let td = document.createElement('td')
                    td.textContent = render_form_data[key]
                    tr.appendChild(td)
                }
            }

            let td = document.createElement('td');
            let edit_btn = document.createElement('button');
            edit_btn.className = 'edit_btn'
            edit_btn.textContent = 'Edit'
            let delete_btn = document.createElement('button');
            delete_btn.className = 'delete_btn'
            delete_btn.textContent = 'Delete'
            td.append(edit_btn, delete_btn);
            tr.appendChild(td)

            // Delete function start here

            delete_btn.addEventListener('click', () => {
                tr.remove();
                for (let index = 0; index < Array_of_object.length; index++) {
                    if (Array_of_object[index] === render_form_data) {
                        Array_of_object.splice(index, 1)
                    }

                }
                localStorage.setItem('Form_Data', JSON.stringify(Array_of_object))

                if (tbody.children[0]) {
                    console.log(tbody.children[0])
                }
                else {
                    table.classList.remove('dtable');
                    table.classList.add('dnone')
                }

            })

            // Delete function close here

            edit_btn.addEventListener('click', () => {
                let i = 0;

                for (const key in render_form_data) {
                    Get_Form_Items[i].value = render_form_data[key]
                    ++i

                }
                const delete_button = document.querySelectorAll('.delete_btn')
                delete_button.forEach(disable => {
                    disable.disabled = true
                })
                const edit_button = document.querySelectorAll('.edit_btn')
                edit_button.forEach(disable => {
                    disable.disabled = true
                })

                const Update_button = document.createElement('button');
                Update_button.textContent = 'Save';
                Update_button.className = 'button'
                const button = document.querySelector('.button');
                button.classList.add('dnone')
                form_box.appendChild(Update_button)

                // UPDATE FUNCTION START HERE

                Update_button.addEventListener('click', () => {

                    const Update_Data = {}

                    if (Product_Name_Test === false) {
                        error_message.textContent = 'Enter Only Aplhabets in Product Name',
                            error_message.style.color = 'red';
                        document.getElementById('Product_Name').focus()
                    }
                    else if (Product_Category_Name_Test === false) {
                        error_message.textContent = 'Enter Only Aplhabets in Product Category Name',
                            error_message.style.color = 'red';
                        document.getElementById('Category_name').focus()
                    }
                    else if (Product_Price_Test === false) {
                        error_message.textContent = 'Enter Only Number in Product Price';
                        error_message.style.color = 'red';
                        document.getElementById('product_price').focus()

                    }
                    else if (Product_Quantity_Test === false) {
                        error_message.textContent = 'Enter Only Number in Product Quantity';
                        error_message.style.color = 'red';
                    }
                    else {
                        Get_Form_Items.forEach(Update_items => {
                            Update_Data[Update_items.name] = Update_items.value
                        })

                        main_form.reset();

                        for (const key in render_form_data) {
                            render_form_data[key] = Update_Data[key]
                        }

                        localStorage.setItem('Form_Data', JSON.stringify(Array_of_object))
                        button.classList.remove('dnone')
                        Update_button.classList.add('dnone')

                        delete_button.forEach(not_disable_delete => {
                            not_disable_delete.disabled = false
                        })

                        edit_button.forEach(not_disable_edit => {
                            not_disable_edit.disabled = false;
                        })

                        let i = 0;
                        for (const update_tr in render_form_data) {
                            tr.children[i].textContent = render_form_data[update_tr]
                            ++i;
                        }

                        error_message.textContent = undefined

                    }














                })

                // UPDATE FUNCTION CLOSE HERE
            })

        })

        // Form Data render using for each loop close here






    }
})

// Submit Function close 


// SEARCH FUNCTION START HERE
search_bar.addEventListener('input', (e) => {
    const search_value = e.target.value;
  
    const lowecase_data = search_value.toLowerCase();
    const table_row = document.querySelectorAll('.table_row');
    table_row.forEach(element => {
        console.log(element.children[1].textContent.toLowerCase().indexOf(lowecase_data))
        if (element.children[1].textContent.toLowerCase().indexOf(lowecase_data) != -1) {
            element.style.display = 'table-row';
        }
        else if (search_value == '') {
            element.style.display = 'table-row';
        }
        else {
            element.style.display = 'none'

        }
    })



})
// SEARCH FUNCTION CLOSE HERE
const obj1 = { a: 10, b: 20 };
const obj2 = { a: 20, b: 10 };

console.log(obj1)
console.log(obj2)

for (const key in obj1) {
    obj1[key] = obj2[key]

}
console.log(obj1)


let name2='hammad';
let name1='md';

console.log(name2.indexOf(name1))