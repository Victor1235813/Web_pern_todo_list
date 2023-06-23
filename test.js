function f() {

    let promise = new Promise((resolve, reject) => {
        let x = 5;
            if (x < 5) {
                setTimeout(() => resolve('done'), 1000);
            } else
                reject(new Error('too big!'));
    });

    promise.catch(
        error => console.log(error.message)
    );
  }
