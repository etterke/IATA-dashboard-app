import{e as I,f as p,i as F,j as a,u as B,v as x}from"./chunk-4G7V7CJ7.js";import{$ as O,$b as E,A as D,B as C,Ma as T,Sa as d,T as z,X as R,Xa as _,Y as y,aa as l,ea as b,fa as V,g as v,i as k,j as h,n as w,y as S}from"./chunk-5SDKPKES.js";function H(s){return s&&typeof s.connect=="function"&&!(s instanceof k)}var L=class{applyChanges(i,u,e,t,r){i.forEachOperation((n,o,c)=>{let f,g;if(n.previousIndex==null){let m=e(n,o,c);f=u.createEmbeddedView(m.templateRef,m.context,m.index),g=1}else c==null?(u.remove(o),g=3):(f=u.get(o),u.move(f,c),g=2);r&&r({context:f?.context,operation:g,record:n})})}detach(){}};var G=new O("_ViewRepeater");var P=20,A=(()=>{let i=class i{constructor(e,t,r){this._ngZone=e,this._platform=t,this._scrolled=new h,this._globalSubscription=null,this._scrolledCount=0,this.scrollContainers=new Map,this._document=r}register(e){this.scrollContainers.has(e)||this.scrollContainers.set(e,e.elementScrolled().subscribe(()=>this._scrolled.next(e)))}deregister(e){let t=this.scrollContainers.get(e);t&&(t.unsubscribe(),this.scrollContainers.delete(e))}scrolled(e=P){return this._platform.isBrowser?new v(t=>{this._globalSubscription||this._addGlobalListener();let r=e>0?this._scrolled.pipe(C(e)).subscribe(t):this._scrolled.subscribe(t);return this._scrolledCount++,()=>{r.unsubscribe(),this._scrolledCount--,this._scrolledCount||this._removeGlobalListener()}}):w()}ngOnDestroy(){this._removeGlobalListener(),this.scrollContainers.forEach((e,t)=>this.deregister(t)),this._scrolled.complete()}ancestorScrolled(e,t){let r=this.getAncestorScrollContainers(e);return this.scrolled(t).pipe(D(n=>!n||r.indexOf(n)>-1))}getAncestorScrollContainers(e){let t=[];return this.scrollContainers.forEach((r,n)=>{this._scrollableContainsElement(n,e)&&t.push(n)}),t}_getWindow(){return this._document.defaultView||window}_scrollableContainsElement(e,t){let r=I(t),n=e.getElementRef().nativeElement;do if(r==n)return!0;while(r=r.parentElement);return!1}_addGlobalListener(){this._globalSubscription=this._ngZone.runOutsideAngular(()=>{let e=this._getWindow();return S(e.document,"scroll").subscribe(()=>this._scrolled.next())})}_removeGlobalListener(){this._globalSubscription&&(this._globalSubscription.unsubscribe(),this._globalSubscription=null)}};i.\u0275fac=function(t){return new(t||i)(l(_),l(p),l(E,8))},i.\u0275prov=R({token:i,factory:i.\u0275fac,providedIn:"root"});let s=i;return s})(),Ie=(()=>{let i=class i{constructor(e,t,r,n){this.elementRef=e,this.scrollDispatcher=t,this.ngZone=r,this.dir=n,this._destroyed=new h,this._elementScrolled=new v(o=>this.ngZone.runOutsideAngular(()=>S(this.elementRef.nativeElement,"scroll").pipe(z(this._destroyed)).subscribe(o)))}ngOnInit(){this.scrollDispatcher.register(this)}ngOnDestroy(){this.scrollDispatcher.deregister(this),this._destroyed.next(),this._destroyed.complete()}elementScrolled(){return this._elementScrolled}getElementRef(){return this.elementRef}scrollTo(e){let t=this.elementRef.nativeElement,r=this.dir&&this.dir.value=="rtl";e.left==null&&(e.left=r?e.end:e.start),e.right==null&&(e.right=r?e.start:e.end),e.bottom!=null&&(e.top=t.scrollHeight-t.clientHeight-e.bottom),r&&a()!=0?(e.left!=null&&(e.right=t.scrollWidth-t.clientWidth-e.left),a()==2?e.left=e.right:a()==1&&(e.left=e.right?-e.right:e.right)):e.right!=null&&(e.left=t.scrollWidth-t.clientWidth-e.right),this._applyScrollToOptions(e)}_applyScrollToOptions(e){let t=this.elementRef.nativeElement;F()?t.scrollTo(e):(e.top!=null&&(t.scrollTop=e.top),e.left!=null&&(t.scrollLeft=e.left))}measureScrollOffset(e){let t="left",r="right",n=this.elementRef.nativeElement;if(e=="top")return n.scrollTop;if(e=="bottom")return n.scrollHeight-n.clientHeight-n.scrollTop;let o=this.dir&&this.dir.value=="rtl";return e=="start"?e=o?r:t:e=="end"&&(e=o?t:r),o&&a()==2?e==t?n.scrollWidth-n.clientWidth-n.scrollLeft:n.scrollLeft:o&&a()==1?e==t?n.scrollLeft+n.scrollWidth-n.clientWidth:-n.scrollLeft:e==t?n.scrollLeft:n.scrollWidth-n.clientWidth-n.scrollLeft}};i.\u0275fac=function(t){return new(t||i)(d(T),d(A),d(_),d(B,8))},i.\u0275dir=V({type:i,selectors:[["","cdk-scrollable",""],["","cdkScrollable",""]],standalone:!0});let s=i;return s})(),W=20,Fe=(()=>{let i=class i{constructor(e,t,r){this._platform=e,this._change=new h,this._changeListener=n=>{this._change.next(n)},this._document=r,t.runOutsideAngular(()=>{if(e.isBrowser){let n=this._getWindow();n.addEventListener("resize",this._changeListener),n.addEventListener("orientationchange",this._changeListener)}this.change().subscribe(()=>this._viewportSize=null)})}ngOnDestroy(){if(this._platform.isBrowser){let e=this._getWindow();e.removeEventListener("resize",this._changeListener),e.removeEventListener("orientationchange",this._changeListener)}this._change.complete()}getViewportSize(){this._viewportSize||this._updateViewportSize();let e={width:this._viewportSize.width,height:this._viewportSize.height};return this._platform.isBrowser||(this._viewportSize=null),e}getViewportRect(){let e=this.getViewportScrollPosition(),{width:t,height:r}=this.getViewportSize();return{top:e.top,left:e.left,bottom:e.top+r,right:e.left+t,height:r,width:t}}getViewportScrollPosition(){if(!this._platform.isBrowser)return{top:0,left:0};let e=this._document,t=this._getWindow(),r=e.documentElement,n=r.getBoundingClientRect(),o=-n.top||e.body.scrollTop||t.scrollY||r.scrollTop||0,c=-n.left||e.body.scrollLeft||t.scrollX||r.scrollLeft||0;return{top:o,left:c}}change(e=W){return e>0?this._change.pipe(C(e)):this._change}_getWindow(){return this._document.defaultView||window}_updateViewportSize(){let e=this._getWindow();this._viewportSize=this._platform.isBrowser?{width:e.innerWidth,height:e.innerHeight}:{width:0,height:0}}};i.\u0275fac=function(t){return new(t||i)(l(p),l(_),l(E,8))},i.\u0275prov=R({token:i,factory:i.\u0275fac,providedIn:"root"});let s=i;return s})();var M=(()=>{let i=class i{};i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=b({type:i}),i.\u0275inj=y({});let s=i;return s})(),Be=(()=>{let i=class i{};i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=b({type:i}),i.\u0275inj=y({imports:[x,M,x,M]});let s=i;return s})();export{H as a,L as b,G as c,A as d,Ie as e,Fe as f,M as g,Be as h};
