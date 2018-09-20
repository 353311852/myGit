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
  //测试下git
  //生命周期钩子,初始化逻辑
  ngOnInit() {
    this.getHeroeList();
  }
  add(name:string,property:string):void{
    name = name.trim();
    property = property.trim();
    if(!name){return;}
    if(!property){return;}
    this.heroService.addHero({name,property} as Hero)
        .subscribe(hero=>{
          this.heroes.push(hero);
          });
  }
  delete(hero:Hero):void{
    if(confirm("你确定要删除吗")){
      //先采用过滤器将英雄删除
       this.heroes = this.heroes.filter(h => h !== hero);
      //调服务器进行删除
      this.heroService.deleteHero(hero)
                      .subscribe();
    }
  }
}
