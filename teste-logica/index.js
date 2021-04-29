const firstMethod = () => {
  console.log('Método 01:');

  const response = [];
  
  arrayLength = arrayLengthFunction();

  let content = prompt('Digite o conteúdo do Array desejado:');

  for (let i = 0; i < arrayLength; i++) {
    response[i] = content;
  }

  console.log(response);
}

const secondMethod = () => {
  console.log('Método 02:');

  let response = [];
  let content = [];
  
  arrayLength = arrayLengthFunction();

  let count = arrayLength - 1;
  for (let i = 0; i < arrayLength; i++) {
    content[i] = prompt(`Digite o conteúdo que irá ocupar a posição ${i} do array:`);
    response[count] = content[i];
    count--;
  }
  console.log(response);
}

const thirdMethod = () => {
  console.log('Método 03:');

  let contents = [];
  
  arrayLength = arrayLengthFunction();

  for (let i = 0; i < arrayLength; i++) {
    contents[i] = prompt(`Digite o conteúdo que irá ocupar a posição ${i} do array(false e undefined serão convertidos).`)
  }

  contents.forEach(content => {
    if(!content | content === 'false' | content === 'undefined' | content === 'null'){
      contents = contents.filter(item => item !== content);
    }
  });

  console.log(contents);
}

const fourthMethod = () => {
  console.log('Método 04:');

  let contents = [];
  
  arrayLength = arrayLengthFunction();

  for (let i = 0; i < arrayLength; i++) {
    let array = [];
    array[0] = prompt('Digite a chave.');
    array[1] = prompt('Digite o valor da chave.');

    contents = [...contents, array];
  }

  const content = new Map(contents);
  const object = Object.fromEntries(content);

  console.log(object);
}

const fifthMethod = () => {
  console.log('Método 05:');

  let contents = [];
  let elementsToRemove = [];

  arrayLength = arrayLengthFunction();

  for (let i = 0; i < arrayLength; i++) {
    contents[i] = prompt(`Digite o valor da posição ${i}:`);
  }

  filterLength = prompt('Digite o número de itens que deseja remover do Array:');

  while (isNaN(filterLength)) {
    filterLength = prompt('Digite o número de itens que deseja remover do Array:');
  }

  for (let i = 0; i < filterLength; i++) {
    elementsToRemove[i] = prompt('Digite o valor que deseja remover do Array:');
  }

  const arrayDone = contents.filter(content => !elementsToRemove.some(elementValue => elementValue === content));

  console.log(arrayDone);
}

const sixthMethod = () => {
  console.log('Método 06:');

  let contents = [];
  
  arrayLength = arrayLengthFunction();

  for (let i = 0; i < arrayLength; i++) {
    contents[i] = prompt(`Digite o valor da posição ${i}:`);
  }

  contents = contents.filter((element, position, self) => {
    return self.indexOf(element) == position;
  });

  console.log(contents);
}

const seventhMethod = () => {
  console.log('Método 07:');

  let firstArray = [];
  let secondArray = [];
  let key = 0;
  
  arrayLength = arrayLengthFunction();

  for (let i = 0; i < arrayLength; i++) {
    firstArray[i] = prompt(`Digite o valor da posição ${i}:`);
  }

  arrayLength = arrayLengthFunction();

  for (let i = 0; i < arrayLength; i++) {
    secondArray[i] = prompt(`Digite o valor da posição ${i}:`);
  }

  if( firstArray.length === secondArray.length ){
    firstArray.forEach((item, i) => {
      if(firstArray[i] !== secondArray[i]){
        console.log(false);
        key = 1;
        return;
      }
    });
    key === 0 ? console.log(true): null;
  } else {
    console.log(false);
  }
}

const eighthMethod = () => {
  console.log('Método 08:');

  let contents = [];
  let secondArrayLength = 0;

  arrayLength = arrayLengthFunction();

  for (let i = 0; i < arrayLength; i++) {
    if(window.confirm(`O valor da da posição ${i} é um array de valores? (Considere o Cancelar como Não.)`)) {
      let array = [];

      secondArrayLength = prompt('Digite o número de itens que deseja no array:');

      while(isNaN(secondArrayLength)) {
        secondArrayLength = prompt('Digite o número de itens que deseja no array:');
      }

      for (let i = 0; i < secondArrayLength; i++) {
        array[i] = prompt(`Digite o valor da posição ${i}:`);
      } 

      contents = [...contents, array]
    } else{
      contents[i] = prompt(`Digite o valor da posição ${i}`)
    }
  }

  const response = contents.flat();

  console.log(response);
}

const ninthMethod = () => {
  console.log('Método 09:');

  let contents = [];
  let response = [[]];
  let group = 0;
  
  arrayLength = arrayLengthFunction();

  for (let i = 0; i < arrayLength; i++) {
    contents[i] = prompt(`Digite o valor da posição ${i}:`);
  }

  let itensPerArray = prompt('Digite o número de itens que deseja em cada array:');

  while (isNaN(itensPerArray)) {
    itensPerArray = prompt('Digite o número de itens que deseja em cada array:');
  }

  for (let i = 0; i < contents.length; i++) {
    if (response[group] === undefined) {
      response[group] = [];
    }

    response[group].push(contents[i]);

    if ((i + 1) % itensPerArray === 0) {
      group++;
    }
  }

  console.log(response);
}

const tenthMethod = () => {
  console.log('Método 10:');

  let firstArray = [];
  let secondArray = [];
  let response = [];

  arrayLength = arrayLengthFunction();
  
  for (let i = 0; i < arrayLength; i++) {
    firstArray[i] = prompt(`Digite o valor da posição ${i}:`);
  }

  arrayLength = arrayLengthFunction();

  for (let i = 0; i < arrayLength; i++) {
    secondArray[i] = prompt(`Digite o valor da posição ${i}:`);
  }

  for (let i = 0; i < firstArray.length; i++) {
    secondArray.forEach(item => {
      if(item === firstArray[i]) {
        response.push(item)
      }
    });
  }

  console.log('response:', response)
}

const arrayLengthFunction = () => {
  let arrayLength = prompt('Digite o tamanho do Array desejado:');

  while(isNaN(arrayLength)) {
    arrayLength = prompt('Digite o tamanho do Array desejado:');
  }
  return arrayLength;
}