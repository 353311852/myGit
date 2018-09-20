import { Injectable } from '@angular/core';
import {Hero} from './Hero/Hero';
import {HeroList} from './mock-data/HeroList/HeroList';
import {Observable,of} from 'rxjs';
import {MessageService} from './message.service';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {catchError,map,tap} from 'rxjs/operators';
/*
@Injectable装饰器依赖注入系统的参与者
*/
@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = "api/heroes";
  constructor(
    private messageService:MessageService,
    private http:HttpClient
    ) { }
  // 打印日志
  private log(message:string){
    this.messageService.add(message);
  }

  //getHeroes():Observable<Hero[]>{
    //this.messageService.add("获取数据成功");
    //return of(HeroList);
  //}
  //通过网络请求
  getHeroes():Observable<Hero[]>{
    this.log("获取数据成功");
    return this.http.get<Hero[]>(this.heroesUrl)
            .pipe(
              tap(heroes=>this.log('fetched heroes')),
              catchError(this.handleError('getHeroes',[]))
              );
  }
  
  //getHero(id:number):Observable<Hero>{
  	//this.messageService.add("添加数据成功");
  	//return of(HeroList.find(hero=>hero.id==id));
  //}
  getHero(id:number):Observable<Hero>{
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
              .pipe(tap(_=>this.log(`fetched hero id=${id}`)),
                catchError(this.handleError('getHeroes',[])));
  }
  private handleError<T>(operation="operation",result?:T){
    return(error,any):Observable<T>=>{
      console.log(error);
      this.log(`${operation}failed:${error.message}`);
      return of(result as T);
    }
  }

  updateHero(hero:Hero):Observable<any>{
      return this.http.put(this.heroesUrl,hero,this.httpOptions).pipe(
          tap(_=>this.log(`updated hero id=${hero.id}`)),
          catchError(this.handleError<any>('updateHero'))
        )
  }
 
    //添加英雄
    addHero(hero:Hero):Observable<Hero>{
      return this.http.post<Hero>(this.heroesUrl,hero,this.httpOptions)
                    .pipe(
                      tap((hero:Hero)=>this.log(`add success w/ id=${hero.id}`)),
                      catchError(this.handleError<Hero>('addHero'))
                      );
    }
    //删除英雄
    deleteHero(hero:Hero):Observable<Hero>{
      const id = typeof hero === 'number' ? hero:hero.id;
      const url = `${this.heroesUrl}/${id}`;
      return this.http.delete<Hero>(url,this.httpOptions)
              .pipe(
                 tap(_=>this.log(`delete success id=${id}`)),
                 catchError(this.handleError<Hero>('deleteHero')) 
                );
    }
    let httpOptions = {
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
}
