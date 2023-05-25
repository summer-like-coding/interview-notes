import{w as ln,c as F}from"./path-53f90ab3.js";import{az as an,aA as K,aB as D,aC as rn,aD as y,S as on,aE as L,aF as _,aG as un,aH as t,aI as sn,aJ as tn,aK as fn}from"./mermaid.core-818f74c7.js";function cn(l){return l.innerRadius}function yn(l){return l.outerRadius}function gn(l){return l.startAngle}function mn(l){return l.endAngle}function pn(l){return l&&l.padAngle}function dn(l,h,S,E,v,A,G,a){var q=S-l,i=E-h,n=G-v,m=a-A,r=m*q-n*i;if(!(r*r<y))return r=(n*(h-A)-m*(l-v))/r,[l+r*q,h+r*i]}function W(l,h,S,E,v,A,G){var a=l-S,q=h-E,i=(G?A:-A)/L(a*a+q*q),n=i*q,m=-i*a,r=l+n,s=h+m,f=S+n,c=E+m,H=(r+f)/2,o=(s+c)/2,p=f-r,g=c-s,R=p*p+g*g,T=v-A,P=r*c-f*s,z=(g<0?-1:1)*L(fn(0,T*T*R-P*P)),B=(P*g-p*z)/R,C=(-P*p-g*z)/R,w=(P*g+p*z)/R,d=(-P*p+g*z)/R,x=B-H,e=C-o,u=w-H,J=d-o;return x*x+e*e>u*u+J*J&&(B=w,C=d),{cx:B,cy:C,x01:-n,y01:-m,x11:B*(v/T-1),y11:C*(v/T-1)}}function vn(){var l=cn,h=yn,S=F(0),E=null,v=gn,A=mn,G=pn,a=null,q=ln(i);function i(){var n,m,r=+l.apply(this,arguments),s=+h.apply(this,arguments),f=v.apply(this,arguments)-rn,c=A.apply(this,arguments)-rn,H=un(c-f),o=c>f;if(a||(a=n=q()),s<r&&(m=s,s=r,r=m),!(s>y))a.moveTo(0,0);else if(H>on-y)a.moveTo(s*K(f),s*D(f)),a.arc(0,0,s,f,c,!o),r>y&&(a.moveTo(r*K(c),r*D(c)),a.arc(0,0,r,c,f,o));else{var p=f,g=c,R=f,T=c,P=H,z=H,B=G.apply(this,arguments)/2,C=B>y&&(E?+E.apply(this,arguments):L(r*r+s*s)),w=_(un(s-r)/2,+S.apply(this,arguments)),d=w,x=w,e,u;if(C>y){var J=sn(C/r*D(B)),M=sn(C/s*D(B));(P-=J*2)>y?(J*=o?1:-1,R+=J,T-=J):(P=0,R=T=(f+c)/2),(z-=M*2)>y?(M*=o?1:-1,p+=M,g-=M):(z=0,p=g=(f+c)/2)}var O=s*K(p),j=s*D(p),N=r*K(T),Q=r*D(T);if(w>y){var U=s*K(g),V=s*D(g),X=r*K(R),Y=r*D(R),I;if(H<an)if(I=dn(O,j,X,Y,U,V,N,Q)){var Z=O-I[0],$=j-I[1],k=U-I[0],b=V-I[1],nn=1/D(tn((Z*k+$*b)/(L(Z*Z+$*$)*L(k*k+b*b)))/2),en=L(I[0]*I[0]+I[1]*I[1]);d=_(w,(r-en)/(nn-1)),x=_(w,(s-en)/(nn+1))}else d=x=0}z>y?x>y?(e=W(X,Y,O,j,s,x,o),u=W(U,V,N,Q,s,x,o),a.moveTo(e.cx+e.x01,e.cy+e.y01),x<w?a.arc(e.cx,e.cy,x,t(e.y01,e.x01),t(u.y01,u.x01),!o):(a.arc(e.cx,e.cy,x,t(e.y01,e.x01),t(e.y11,e.x11),!o),a.arc(0,0,s,t(e.cy+e.y11,e.cx+e.x11),t(u.cy+u.y11,u.cx+u.x11),!o),a.arc(u.cx,u.cy,x,t(u.y11,u.x11),t(u.y01,u.x01),!o))):(a.moveTo(O,j),a.arc(0,0,s,p,g,!o)):a.moveTo(O,j),!(r>y)||!(P>y)?a.lineTo(N,Q):d>y?(e=W(N,Q,U,V,r,-d,o),u=W(O,j,X,Y,r,-d,o),a.lineTo(e.cx+e.x01,e.cy+e.y01),d<w?a.arc(e.cx,e.cy,d,t(e.y01,e.x01),t(u.y01,u.x01),!o):(a.arc(e.cx,e.cy,d,t(e.y01,e.x01),t(e.y11,e.x11),!o),a.arc(0,0,r,t(e.cy+e.y11,e.cx+e.x11),t(u.cy+u.y11,u.cx+u.x11),o),a.arc(u.cx,u.cy,d,t(u.y11,u.x11),t(u.y01,u.x01),!o))):a.arc(0,0,r,T,R,o)}if(a.closePath(),n)return a=null,n+""||null}return i.centroid=function(){var n=(+l.apply(this,arguments)+ +h.apply(this,arguments))/2,m=(+v.apply(this,arguments)+ +A.apply(this,arguments))/2-an/2;return[K(m)*n,D(m)*n]},i.innerRadius=function(n){return arguments.length?(l=typeof n=="function"?n:F(+n),i):l},i.outerRadius=function(n){return arguments.length?(h=typeof n=="function"?n:F(+n),i):h},i.cornerRadius=function(n){return arguments.length?(S=typeof n=="function"?n:F(+n),i):S},i.padRadius=function(n){return arguments.length?(E=n==null?null:typeof n=="function"?n:F(+n),i):E},i.startAngle=function(n){return arguments.length?(v=typeof n=="function"?n:F(+n),i):v},i.endAngle=function(n){return arguments.length?(A=typeof n=="function"?n:F(+n),i):A},i.padAngle=function(n){return arguments.length?(G=typeof n=="function"?n:F(+n),i):G},i.context=function(n){return arguments.length?(a=n??null,i):a},i}export{vn as a};
