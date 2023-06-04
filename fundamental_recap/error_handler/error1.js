const intervalId = setInterval(() => {
  console.log("시작 ==== ");
  try {
    throw new Error("서버를 고장내자");
  } catch (error) {
    console.log("trycatch가 보호중이지롱");

    clearInterval(intervalId);
  }
}, 1000);
