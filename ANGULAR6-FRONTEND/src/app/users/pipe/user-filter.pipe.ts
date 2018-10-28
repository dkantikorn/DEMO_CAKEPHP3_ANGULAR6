import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {



  /**
* 
* Function user filter by user property
* @author  sarawutt.b
* @param value as array of user Object
* @param filterBy as a string of search key
*/
  transform(value: any, filterBy: string): any {

    filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
    return filterBy ? value.filter(data => {
      return data.username.toString().toLocaleLowerCase().includes(filterBy) ||
        data.first_name.toLocaleLowerCase().includes(filterBy) ||
        data.last_name.toLocaleLowerCase().includes(filterBy)
    }) : value;
  }

}
