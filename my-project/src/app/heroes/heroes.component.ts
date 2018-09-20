import { Component, OnInit } from '@angular/core';
import {Hero} from '../Hero/Hero';
import {HeroService} from '../hero.service'
/*
英雄的集合
@Component装饰器函数
selector -- 组件的选择器(css元素选择器)
templateUrl -- 组件模板文件的位置
styleUrls -- 组件私有css样式表文件的位置
*/
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes:Hero[];
  constructor(private heroService:HeroService) { }
  getHeroeList():void{
      this.heroService.getHeroes().subscribe(heroes=>this.heroes = heroes);
  }
  //生命周期钩子,初始化逻辑
  ngOnInit() {
    this.getHeroeList();
  }

}
