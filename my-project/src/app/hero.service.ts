import { Injectable } from '@angular/core';
import {Hero} from './Hero/Hero';
import {HeroList} from './mock-data/HeroList/HeroList';
import {Observable,of} from 'rxjs';
import {MessageService} from './message.service';
/*
@Injectable装饰器依赖注入系统的参与者
*/
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService:MessageService) { }
  getHeroes():Observable<Hero[]>{
  	this.messageService.add("获取数据成功");
  	return of(HeroList);
  }
}
