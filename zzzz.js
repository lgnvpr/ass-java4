// s(x,n)=x^1+x^2+...x^n


function sumDQ(x, n, count, sum){
    
    if(count!=n){
        return  sum + sumDQ(x, n, count+1, sum) + (x**count );
    }
    else {
        return sum + (x**count ) ;
    }
}

console.log(sumDQ(3,4 ,1, 0))


