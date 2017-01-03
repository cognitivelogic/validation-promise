# validation-promise
Promised based validation library

## Installation

(still to do...)
```
npm install validation-promise
```

## Usage

Validates an object against a specified validation contract
```
import validate from 'validation-promise';

var contract = [
      {key: 'age',
        promises: [int],
        msg: (value, row, arg) => value + ' not an int',
        arg: {}
      }];
      
var data = {
        age: '11'
      };
      
validate(contract, data)
        .then(() => {
          // The validations have passed...
        })
        .catch(error => {
          // Validations failed - error is an object keyed on data keys, and containing an array of error messages. 
        });
```
