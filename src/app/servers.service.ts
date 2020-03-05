import { Injectable } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs/Rx";

@Injectable()
export class ServersService{
    constructor(private http: Http){}

    storeServer(servers:any[]){
        const headerss= new Headers({"Content-Type": "application/json"});
        // return this.http.post('https://ng-http-practice-a9ebc.firebaseio.com/,data.json',
        // servers,
        // {headers:headerss});
        return this.http.put('https://ng-http-practice-a9ebc.firebaseio.com/,data.json',
        servers,
        {headers:headerss});
        //put overrides the stored data and post append new data to server
    }

    getServer(){
        return this.http.get('https://ng-http-practice-a9ebc.firebaseio.com/,data') //add data.json to remove catche error
       .map(
            (response: Response)=>{
                const data=response.json();
                console.log(data);
                for (const server of data){
                    server.name="FETCHED_"+server.name;
                }
                return data;
            }     
        )
        .catch(
            (error:Response)=>{
                return Observable.throw('Something went wrong');
            }
        );
    }

    getAppName(){
       return this.http.get("https://ng-http-practice-a9ebc.firebaseio.com/App%20Name.json")
        .map(
            (response: Response)=>{
                return response.json();
            }
        );
    }

}