import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { JsonFormatter } from "./pages/JsonFormatter";
import { Base64Converter } from "./pages/Base64Converter";
import { UuidGenerator } from "./pages/UuidGenerator";
import { ColorConverter } from "./pages/ColorConverter";
import { LoremIpsum } from "./pages/LoremIpsum";
import { UrlEncoder } from "./pages/UrlEncoder";

import { Home } from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/json-formatter" element={<JsonFormatter />} />
          <Route path="/base64" element={<Base64Converter />} />
          <Route path="/uuid" element={<UuidGenerator />} />
          <Route path="/color" element={<ColorConverter />} />
          <Route path="/lorem" element={<LoremIpsum />} />
          <Route path="/url" element={<UrlEncoder />} />
          <Route path="*" element={<div className="p-4">Tool coming soon...</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
