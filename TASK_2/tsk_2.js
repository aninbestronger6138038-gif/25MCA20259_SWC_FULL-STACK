const students = [
  { name: "Aman", marks: 85 },
  { name: "Priya", marks: 45 },
  { name: "Rohit", marks: 72 },
  { name: "Neha", marks: 91 },
  { name: "Karan", marks: 38 }
];

function fetchStudents() {
   return new Promise((resolve) => {
       setTimeout ( () => {
        resolve(students);
    }, 2000);
});
}

async function getData(){
    const data = await fetchStudents();
//map
const names= data.map(students => students.name);
console.log(names);

//filter 
const filtered_data = data.filter(students => students.marks >=50);
console.log(filtered_data);

//Total marks
const total_marks = data.reduce((sum , students) => { 
    return sum+students.marks;
},0);

console.log(total_marks);

const average_marks = data.reduce((average , students) => {
    return average + students.marks;
},0) / data.length;
console.log(average_marks);

};

getData();
