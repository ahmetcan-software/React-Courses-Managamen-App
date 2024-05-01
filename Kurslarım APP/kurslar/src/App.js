import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Courses from "./Courses";
import Loading from "./Loading";

function App() {
  const [courses, setCourses] = useState([]); // todo- burda courses state'i olarak tanımladığımızı Courses compenentine geçicez. Yani parenttan childa props geçicez
  const [loading, setLoading] = useState(true); // sayfa yüklendi mi yüklenmedi mi kontrolü için true-false ile kontrol ediyoruz. True derken yani "yükleniyor..." aktif demek
  const handleUpdateBtn = () => {
    setCourses(fetchCourses); // ?  burda aşağıdan tetiklenen Güncelle butonuna tıkladığımızda apiden gelen verileri tekrar ekrana bastık
  };

  const deleteCourse = (id) => {
    //  todo---en son compenenden(course) parenta kadar yukarı taşıyarak butona bastığında yakaladığımız id değerini getirdik. Bunu sürekli props geçerek yaptık.
    // ! bu getirdiğimiz id değerini istediğimiz isimle alabiliriz, ben 'id' olarak çektim ve consola basarak kontrol ettim
    // console.log(id);
    //?--- şimdi deleteCourse functionı içinde silme işlemini yapıyoruz
    const afterDeletedCourses = courses.filter((remainingCours) => {
      //todo her filtrelediğim kursumu remainingCours olarak yakalıyorum
      return remainingCours.id !== id; //yani bizim sil butonu tetiklendiğinde seçmiş olduğumuz id'nin dışında kalanları return et demiş olduk
    });
    setCourses(afterDeletedCourses); // todo sildikten snra kalan datayı(afterDeletedCourses) da setleme işlemini yapıyorum

    // console.log(afterDeletedCourses);
  };
  const fetchCourses = async () => {
    setLoading(true); // ne zaman ki data çekme işlemine başladı o zman setLoadingi çalıştırdık, ne zmaan ki veri çekildi false'a çektik.
    // !   burda try catch'e sokmamızın sebebi eğer data doğru şekilde çekilemezse o zmaan loading compenendi çalışsın ve kullanıcıyı uyarsın, bekletsin diye.
    try {
      const response = await axios.get(" http://localhost:3001/kurslar "); // bu response içinde db.json içindeki datayı tutuyoruz
      setCourses(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCourses(); // burda yukarıda tanımlayacağımız function'ı çağırıyoruz
  }, []); // bunu boş array olarak vermemizin sebebi bir kere render edilsin diye yani spesifik bir kanca takmak istemedik

  return (
    <div className="App">
      {loading ? (
        <Loading />
      ) : (
        <>
          {courses.length === 0 ? ( //! kursların sayısı 0'a eşit olduğunda div içindeki h2 uyarısı çalışşın, 0'a eşit değilse de yine kursları göstermeye devam etsin
            <div className="updateWrapper">
              <h2 className="updateTitle">Kursların tamamını sildiniz.</h2>
              <button className="refreshBtn" onClick={handleUpdateBtn}>
                Güncelle
              </button>
            </div>
          ) : (
            <Courses
              courses={courses}
              removeCourse={deleteCourse}
            /> /*  yukarda set ettiğim yani dataları çektiğim courses state'ini artık Courses
      chid compenendine yine kendi adıyla props olarak geçiyorum. Bu şekilde artık Courses compenendinde datalarımı kullanabileceğim. 
      Kullananabilmek için Courses compenendinde Function içine süslü parantez içinde propsumun adını aynı olacak şekilde parametre olarak yazıyorum  */
          )}
        </>
      )}
    </div>
  );
}

export default App;
