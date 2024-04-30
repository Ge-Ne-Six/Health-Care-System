

const array1 = [1,2,3,6,5,6,6]
const array2 = []

for(i = 0; i < array1.length; i++){

  let value = array1[i];

  if(value === 6){
    array2.push(value)
  }
  
}

console.log(array2)