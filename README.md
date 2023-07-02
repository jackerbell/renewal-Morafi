# Morafi UPDATED!
![리드미메인화면](https://github.com/jackerbell/renewal-Morafi/assets/65724413/5d410afa-7355-4355-a291-46bd85033fca)

🧇  Intro(기획 배경 및 소개)
> <b>Mo</b>vie + g<b>raffi</b>ti = <b>Morafi!</b> <br>
> Netflix, Laftel, MegaBox, wavve... 등 국내외 영화 및 사이트들을 참조하며 만든 사이트로 과거 <a href="https://github.com/jackerbell/Morafi" target="_blank">프로젝트</a>에서 업데이트 했습니다. <br> 기존의 props drill, `R`을 이용해 자체적으로 만든 데이터베이스의 한계(이미지 해상도, 광고 영상, 세부 정보 부족..) 등 여러 단점들을 보완하기 위해 전면 개편했습니다. <br>
> 이번에  TDMB api, MUI 를 활용해 보다 효율적으로 UI를 구현할 수 있었고 데이터의 경우 NOSQL방식이 현재 프로젝트에 좀 더 적합하고 배포환경에 유리하다고 판단해서 MongoDB 및 Atlas를 이용했습니다. <br>
> 새로운 아이디어를 고집하기 보다는 기존에 접했던 환경을 먼저 구현해보고 싶었고, `영화 커뮤니티 운영`이라는 제 개인적인 목표의 첫걸음으로 구현한 프로젝트입니다. <br>

<br>
<br>

🚀 deploy
> Enterance is here → <a href="https://renewal-morafi.vercel.app/" target=_blank>Morafi!</a> 

<br>
<br>

🧑🏻‍💻 Tech Stack <br>

FrontEnd <br>

<a href="https://create-react-app.dev/" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=blue"></a>
<a href="https://reactrouter.com/" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/React--router-CA4245?style=flat-square&logo=React-router&logoColor=white"></a>
<a href="https://mui.com/" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/MUI-007FFF?style=flat-square&logo=mui&logoColor=white"></a>
<a href="https://swiperjs.com/" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/Swiper-6332F6?style=flat-square&logo=swiper&logoColor=white"></a>
<a href="https://axios-http.com/" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white"></a>
<a href="https://formik.org/" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/Formik-blue?style=flat-square&logoColor=white"></a>
<a href="https://github.com/jquense/yup/" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/Yup-blue?style=flat-square&logoColor=white"></a>

<br>

BackEnd <br>

<a href="https://expressjs.com/" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=Express&logoColor=white"></a>
<a href="https://express-validator.github.io/docs/" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/Express--validator-grey?style=flat-square&logoColor=white"></a>
<a href="https://axios-http.com/" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white"></a>
<a href="https://github.com/auth0/node-jsonwebtoken" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white"></a>

<br>

DB <br>

<a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/TMDB-01B4E4?style=flat-square&logo=the movie database&logoColor=white"></a>
<a href="https://mongoosejs.com/" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/Mongoose-880000?style=flat-square&logo=mongoose&logoColor=white"></a>

<br>
<br>

🗓 Develop period
* 2023.05.08 ~ 2023.06.09 (1차)
* 2023.06.12 ~ Proceeding (Refactoring)

<br>
<br>

📝 Service Flow Chart <br>
![diagram drawio (1)](https://github.com/jackerbell/renewal-Morafi/assets/65724413/5e78a3fa-b406-44cb-8d6c-38c11f836b52)

<br>
<br>

💡 core function
1.  Sign up / Sign in / Sign out
2.  Save movie to Favorite list (Remove that)
3.  Write review(comment) for movie (Delete that)
4.  Search movies | tv series | people(actor)
5.  Light / Dark mode(theme)

<br>
<br>
🎨 demonstration video


# Morafi API Specification
## Schema 
### User
```javascript
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  displayName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  salt: {
    type: String,
    required: true,
    select: false
  }
}, modelOptions);
```
### Review
```javascript
export default mongoose.model(
  "Review",
  mongoose.Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    content: {
      type: String,
      required: true
    },
    mediaType: {
      type: String,
      enum: ["tv", "movie"],
      required: true
    },
    mediaId: {
      type: String,
      required: true
    },
    mediaTitle: {
      type: String,
      required: true
    },
    mediaPoster: {
      type: String,
      required: true
    },
  }, modelOptions)
);
```

### Favorite
```javascript
export default mongoose.model(
  "Favorite",
  mongoose.Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    mediaType: {
      type: String,
      enum: ["tv", "movie"],
      required: true
    },
    mediaId: {
      type: String,
      required: true
    },
    mediaTitle: {
      type: String,
      required: true
    },
    mediaPoster: {
      type: String,
      required: true
    },
    mediaRate: {
      type: Number,
      required: true
    },
  }, modelOptions)
);
```
### Model.Options
```javascript
const modelOptions = {
  toJSON: {
    virtuals: true,
    transform: (_,obj) => {
      delete obj._id;
      return obj;
    }
  },
  toObject: {
    virtuals: true,
    transform: (_,obj) => {
      delete obj._id;
      return obj;
    }
  },
  versonKey: false,
  timestamps: true
};

export default modelOptions;
```

<br>
<br>

## API Request
### User path: /user

> POST/signup
```javascript
router.post(
  "/signup",
  body("username")
    .exists().withMessage("username is required")
    .isLength({ min: 8 }).withMessage("username minimum 8 characters")
    .custom(async value => {
      const user = await userModel.findOne({ username: value });
      if (user) return Promise.reject("username already used");
    }),
  body("password")
    .exists().withMessage("password is required")
    .isLength({ min: 8 }).withMessage("password minimum 8 characters"),
  body("confirmPassword")
    .exists().withMessage("confirmPassword is required")
    .isLength({ min: 8 }).withMessage("confirmPassword minimum 8 characters")
    .custom((value, { req }) => {
      if (value !== req.body.password) throw new Error("confirmPassword not match");
      return true;
    }),
  body("displayName")
    .exists().withMessage("displayName is required")
    .isLength({ min: 8 }).withMessage("displayName minimum 8 characters"),
  requestHandler.validate,
  userController.signup
);
```

> POST/signin
```javascript
router.post(
  "/signin",
  body("username")
    .exists().withMessage("username is required")
    .isLength({ min: 8 }).withMessage("username minimum 8 characters"),
  body("password")
    .exists().withMessage("password is required")
    .isLength({ min: 8 }).withMessage("password minimum 8 characters"),
  requestHandler.validate,
  userController.signin
);
```

> PUT/update-password
```javascript
router.put(
  "/update-password",
  tokenMiddleware.auth,
  body("password")
    .exists().withMessage("password is required")
    .isLength({ min: 8 }).withMessage("password minimum 8 characters"),
  body("newPassword")
    .exists().withMessage("newPassword is required")
    .isLength({ min: 8 }).withMessage("newPassword minimum 8 characters"),
  body("confirmNewPassword")
    .exists().withMessage("confirmNewPassword is required")
    .isLength({ min: 8 }).withMessage("confirmNewPassword minimum 8 characters")
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) throw new Error("confirmNewPassword not match");
      return true;
    }),
  requestHandler.validate,
  userController.updatePassword
);
```

> GET/info
```javascript
router.get(
  "/info",
  tokenMiddleware.auth,
  userController.getInfo
);
```

> GET/favorites
```javascript
router.get(
  "/favorites",
  tokenMiddleware.auth,
  favoriteController.getFavoritesOfUser
);
```

> POST/favorites
```javascript
router.post(
  "/favorites",
  tokenMiddleware.auth,
  body("mediaType")
    .exists().withMessage("mediaType is required")
    .custom(type => ["movie", "tv"].includes(type)).withMessage("mediaType invalid"),
  body("mediaId")
    .exists().withMessage("mediaId is required")
    .isLength({ min: 1 }).withMessage("mediaId can not be empty"),
  body("mediaTitle")
    .exists().withMessage("mediaTitle is required"),
  body("mediaPoster")
    .exists().withMessage("mediaPoster is required"),
  body("mediaRate")
    .exists().withMessage("mediaRate is required"),
  requestHandler.validate,
  favoriteController.addFavorite
);
```

> DELETE/favorites/:favoriteId
```javascript
router.delete(
  "/favorites/:favoriteId",
  tokenMiddleware.auth,
  favoriteController.removeFavorite
);
```
<br>

### review path: /reviews
> GET/
```javascript
router.get(
  "/",
  tokenMiddleware.auth,
  reviewController.getReviewsOfUser
);
```
> POST/
```javascript
router.post(
  "/",
  tokenMiddleware.auth,
  body("mediaId")
    .exists().withMessage("mediaId is required")
    .isLength({ min: 1 }).withMessage("mediaId can not be empty"),
  body("content")
    .exists().withMessage("content is required")
    .isLength({ min: 1 }).withMessage("content can not be empty"),
  body("mediaType")
    .exists().withMessage("mediaType is required")
    .custom(type => ["movie", "tv"].includes(type)).withMessage("mediaType invalid"),
  body("mediaTitle")
    .exists().withMessage("mediaTitle is required"),
  body("mediaPoster")
    .exists().withMessage("mediaPoster is required"),
  requestHandler.validate,
  reviewController.create
);
```
> DELETE/:reviewId
```javascript
router.delete(
  "/:reviewId",
  tokenMiddleware.auth,
  reviewController.remove
);
```
<br>

### person path: /person
> GET/:personId/medias
```javascript
router.get("/:personId/medias", personController.personMedias);
```

> GET/:personId/medias
```javascript
router.get("/:personId", personController.personDetail);
```

### media path: /:mediaType
> GET/search
```javascript
router.get("/search", mediaController.search);
```

> GET/genres
```javascript
router.get("/genres", mediaController.getGenres);
```

> GET/detail/:mediaId
```javascript
router.get("/detail/:mediaId", mediaController.getDetail);
```

> GET/:mediaCategory
```javascript
router.get("/:mediaCategory", mediaController.getList);
```

<br>
<br>

# test!
id: tester@test.com <br>
pw: test1234

<br>
<br>

# Preview
![movies](https://github.com/jackerbell/renewal-Morafi/assets/65724413/0f4b65c8-ff27-4d5f-a935-fcd0fa245d52)
![search](https://github.com/jackerbell/renewal-Morafi/assets/65724413/7ba0a126-ee27-4b16-8620-5f11d1e3b483)
![TVSeries](https://github.com/jackerbell/renewal-Morafi/assets/65724413/655f0311-5d7c-4618-8210-d0acd527ab88)
![메인화면](https://github.com/jackerbell/renewal-Morafi/assets/65724413/cb3bfe88-c16a-4782-a025-e02492b33804)
![메인화면2](https://github.com/jackerbell/renewal-Morafi/assets/65724413/74c53f7e-c84f-40dc-829a-c37cc542e766)
![밝은버전](https://github.com/jackerbell/renewal-Morafi/assets/65724413/333efac5-8cb3-4aad-830a-b0da2dbdbcbe)


